import { useTypedSelector } from '../../hooks/use-typed-selector';
import Tree from '../TreeStructure/Tree';
import { useActions } from '../../hooks/use-actions';
import ModalBase from './ModalBase';

interface FilePickerModalProps {
  setIsShowing: (status: boolean) => void;
}

const FilePickerModal: React.FC<FilePickerModalProps> = ({ setIsShowing }) => {
  const { tree, loading, modalFile, root } = useTypedSelector(
    (state) => state.trees
  );

  const { deselectModalFile } = useActions();

  const onClose = () => {
    deselectModalFile();
    setIsShowing(false);
  };

  const handleOpen = () => {
    const redirectPath = modalFile.replace(root.path, '').replaceAll('\\', '/');
    window.open(`/notebooks${redirectPath}`);
    deselectModalFile();
    setIsShowing(false);
  };

  const renderTree = () => {
    if (loading) {
      return (
        <progress className="progress is-small is-primary" max="100">
          15%
        </progress>
      );
    }

    if (!tree) {
      return <h4>Empty folder</h4>;
    }

    return <Tree treeData={tree.children} />;
  };

  const footer = (
    <>
      <button
        className="button is-outlined"
        onClick={handleOpen}
        disabled={modalFile === ''}
      >
        Open
      </button>
      <button className="button is-danger is-outlined" onClick={onClose}>
        Cancel
      </button>
      <p className="help">
        {modalFile === ''
          ? 'You need to select file!'
          : `Selected file ${modalFile.replace(root.path, '')}`}
      </p>
    </>
  );

  return (
    <ModalBase
      onCancel={onClose}
      section={renderTree()}
      sectionStyle={{ height: '300px' }}
      footer={footer}
    />
  );
};

export default FilePickerModal;
