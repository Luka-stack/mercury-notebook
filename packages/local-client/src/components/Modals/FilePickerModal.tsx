import { useTypedSelector } from '../../hooks/use-typed-selector';
import Tree from '../TreeStructure/Tree';
import { useActions } from '../../hooks/use-actions';

interface FilePickerModalProps {
  isShowing: boolean;
  setIsShowing: (status: boolean) => void;
}

const FilePickerModal: React.FC<FilePickerModalProps> = ({
  isShowing,
  setIsShowing,
}) => {
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

  return (
    <div className={`modal ${isShowing && 'is-active'}`}>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete is-medium" onClick={onClose}></button>
        </header>

        <section className="modal-card-body" style={{ height: '300px' }}>
          {renderTree()}
        </section>

        <footer className="modal-card-foot">
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
        </footer>
      </div>
    </div>
  );
};

export default FilePickerModal;
