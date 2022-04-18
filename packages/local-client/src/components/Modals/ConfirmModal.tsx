import ModalBase from './ModalBase';

interface ConfirmModalProps {
  contnet: string;
  confirmLabel?: string;
  cancelLabel?: string;

  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  contnet,
  confirmLabel = 'Proceed',
  cancelLabel = 'Cancel',
  onCancel,
  onConfirm,
}) => {
  const rernderSection = <>{contnet}</>;

  const renderFooter = (
    <>
      <button className="button is-primary" onClick={onConfirm}>
        {confirmLabel}
      </button>
      <button className="button" onClick={onCancel}>
        {cancelLabel}
      </button>
    </>
  );

  return (
    <ModalBase
      onCancel={onCancel}
      section={rernderSection}
      footer={renderFooter}
    />
  );
};

export default ConfirmModal;
