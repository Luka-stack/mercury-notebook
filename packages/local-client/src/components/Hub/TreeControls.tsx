import './TreeControls.css';

import { PartialTree } from '../../layouts/HubLayout';
import { useActions } from '../../hooks/use-actions';
import { FileTree } from '../../state';
import { useState } from 'react';
import ChangeNameModal from '../Modals/ChangeNameModal';
import ConfirmModal from '../Modals/ConfirmModal';

interface TreeControlsProps {
  breadcrumb: PartialTree[];
  selectedFiles: FileTree[];
  setSelectedFiles: (files: FileTree[]) => void;
}

const TreeControls: React.FC<TreeControlsProps> = ({
  breadcrumb,
  selectedFiles,
  setSelectedFiles,
}) => {
  const [renameModal, setRenameModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const { createFolder, createNotebook } = useActions();

  const { deleteFiles, renameFile, cleanRenameErrors } = useActions();

  const onNameChanged = (filename: string) => {
    const tree = selectedFiles[0];
    renameFile(tree.path, tree.path.replace(tree.name, filename), () => {
      setRenameModal(false);
      setSelectedFiles([]);
    });
  };

  const onRenameModalClosed = () => {
    cleanRenameErrors();
    setRenameModal(false);
  };

  const onDeleteClick = () => {
    deleteFiles(selectedFiles);
    setSelectedFiles([]);
    setDeleteModal(false);
  };

  const onNewNotebookClick = () => {
    let crumbPath = '';
    if (breadcrumb.length) {
      crumbPath = breadcrumb.map((c) => c.name).join('/');
    }
    createNotebook(crumbPath);
  };

  const onNewFolderClick = () => {
    let crumbPath = '';
    if (breadcrumb.length) {
      crumbPath = breadcrumb.map((c) => c.name).join('/');
    }

    createFolder(crumbPath);
  };

  return (
    <>
      <div className="tree-controls container">
        <div className="tree-controls notification">
          {selectedFiles.length > 0 && (
            <button
              className="button icon-button is-danger is-small"
              onClick={() => setDeleteModal(true)}
            >
              <i className="fa fa-trash" />
            </button>
          )}
          {selectedFiles.length === 1 && (
            <button
              className="button is-warning is-small"
              onClick={() => setRenameModal(true)}
            >
              Rename
            </button>
          )}
          <button
            className="button is-primary is-small"
            onClick={onNewNotebookClick}
          >
            New notebook
          </button>
          <button
            className="button is-primary is-small"
            onClick={onNewFolderClick}
          >
            New folder
          </button>
        </div>
      </div>
      {renameModal && (
        <ChangeNameModal
          setFilename={onNameChanged}
          onCancel={onRenameModalClosed}
          tree={selectedFiles[0]}
        />
      )}
      <ConfirmModal
        contnet={`You are about to delete ${selectedFiles.length} files.`}
        isShowing={deleteModal}
        setIsShowing={setDeleteModal}
        onConfirm={onDeleteClick}
      />
    </>
  );
};

export default TreeControls;
