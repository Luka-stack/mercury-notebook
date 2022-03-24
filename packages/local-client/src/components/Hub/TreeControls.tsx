import './TreeControls.css';

import { PartialTree } from '../../layouts/HubLayout';
import { useActions } from '../../hooks/use-actions';

interface TreeControlsProps {
  breadcrumb: PartialTree[];
}

const TreeControls: React.FC<TreeControlsProps> = ({ breadcrumb }) => {
  const { createFolder, createNotebook } = useActions();

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
