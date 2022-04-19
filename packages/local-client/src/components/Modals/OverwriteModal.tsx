import ModalBase from './ModalBase';

interface OverwriteModalProps {
  onClose: () => void;
  onReload: () => void;
  onOverwrite: () => void;
}

const MESSAGE =
  'The notebook file has changed on disk since the last time we opened or saved it. Do you want to overwrite the file on disk with the version open here, or load the version on disk (reload the page)?';
const WARNING = 'Auto save has been disabled';

const OverwriteModal: React.FC<OverwriteModalProps> = ({
  onClose,
  onReload,
  onOverwrite,
}) => {
  const footer = (
    <>
      <button className="button is-warning" onClick={onReload}>
        Relaod
      </button>
      <button className="button is-danger" onClick={onOverwrite}>
        Overwrite
      </button>
      <button className="button" onClick={onClose}>
        Cancel
      </button>
    </>
  );

  const section = (
    <>
      <p>{MESSAGE}</p>
      <b style={{ color: '#8C6A08' }}>{WARNING}</b>
    </>
  );

  return <ModalBase onCancel={onClose} section={section} footer={footer} />;
};

export default OverwriteModal;
