import './TreeControls.css';

import { useActions } from '../../hooks/use-actions';

const TreeControls = () => {
  const { createNotebook, createFolder } = useActions();

  const onNewNotebookClick = () => {
    createNotebook();
  };

  const onNewFolderClick = () => {
    createFolder();
  };

  return (
    <div className="tree-controls container">
      <div className="tree-controls notification">
        {/* <button className="button icon-button is-danger is-small">
          <i className="fa fa-trash" />
        </button> */}
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
  );
};

export default TreeControls;
