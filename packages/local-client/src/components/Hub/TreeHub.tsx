import './TreeHub.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useState } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { FileTree } from '../../state';
import { findTree } from '../../utils';
import { PartialTree } from '../../layouts/HubLayout';
import { windowRouter } from '../../router';

dayjs.extend(relativeTime);

interface TreeHubProps {
  breadcrumb: PartialTree[];
  setBreadcrumb: (trees: PartialTree[]) => void;
  selectedFiles: FileTree[];
  setSelectedFiles: (trees: FileTree[]) => void;
}

const TreeHub: React.FC<TreeHubProps> = ({
  breadcrumb,
  setBreadcrumb,
  selectedFiles,
  setSelectedFiles,
}) => {
  const [currDir, setCurrDir] = useState<string>('');
  const [showType, setShowType] = useState<string>('All');
  const [sortingOrder, setSortingOrder] = useState<[boolean, boolean]>([
    true,
    true,
  ]);

  const { tree, loading } = useTypedSelector((state) => state.trees);

  const onCheckboxClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    tree: FileTree
  ) => {
    if (event.target.checked) {
      setSelectedFiles([...selectedFiles, tree]);
    } else {
      setSelectedFiles(selectedFiles.filter((el) => el.id !== tree.id));
    }
  };

  const onSortClick = (name: boolean) => {
    setSortingOrder([name, !sortingOrder[1]]);
  };

  const onTreeElementClick = (tree: FileTree) => {
    if (tree.type === 'directory') {
      setSelectedFiles([]);
      setCurrDir(tree.id);

      if (breadcrumb) {
        setBreadcrumb([...breadcrumb, tree]);
      } else {
        setBreadcrumb([tree]);
      }
    } else {
      let crumbPath = '';
      if (breadcrumb.length) {
        crumbPath = breadcrumb.map((c) => c.name).join('/');
      }

      windowRouter.newWindow(
        windowRouter.constructNotebookPath(crumbPath, tree.name)
      );
    }
  };

  const onBreadcrumbClick = (part: PartialTree, id: number) => {
    setCurrDir(part.id);
    setBreadcrumb(breadcrumb!.slice(0, id + 1));
    setSelectedFiles([]);
  };

  const rootDirClicked = () => {
    setCurrDir('');
    setBreadcrumb([]);
    setSelectedFiles([]);
  };

  const renderFiles = () => {
    let workingTree = findTree(tree, currDir);
    if (!workingTree) {
      return (
        <tr>
          <td colSpan={4}>Folder is empty</td>
        </tr>
      );
    }

    const tmp = workingTree.children.slice();

    if (sortingOrder[0]) {
      tmp.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      tmp.sort((a, b) => +new Date(a.mtime) - +new Date(b.mtime));
    }

    if (!sortingOrder[1]) {
      tmp.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }

    let classes;

    return tmp.map((child) => {
      classes = 'fa fa-folder';
      if (child.type === 'file') {
        classes = 'fa fa-book italic';

        if (child.active) {
          if (showType === 'Inactive') {
            return null;
          }
          classes += ' used';
        } else if (showType === 'Active') {
          return null;
        }
      }

      return (
        <tr key={child.id}>
          <td style={{ width: '0px' }}>
            <input
              type="checkbox"
              onChange={(e) => onCheckboxClick(e, child)}
            />
          </td>
          <td style={{ width: '0px', paddingRight: '8px' }}>
            <i className={classes} />
          </td>
          <td colSpan={2} style={{ paddingLeft: '0px' }}>
            <span className="link" onClick={() => onTreeElementClick(child)}>
              {child.name}
            </span>
          </td>
          <td style={{ textAlign: 'center' }}>
            {dayjs(child.mtime).fromNow()}
          </td>
        </tr>
      );
    });
  };

  const renderBreadcrumb = () => {
    if (!breadcrumb || !breadcrumb.length) return <li></li>;

    return breadcrumb.map((c, id) => (
      <li key={id}>
        <u onClick={() => onBreadcrumbClick(c, id)}>{c.name}</u>
      </li>
    ));
  };

  const renderNameBadge = (
    <th style={{ textAlign: 'right', cursor: 'pointer' }}>
      <div className="cst-dropdown">
        <span className="tag is-dark dobule-badge-left">Show :</span>
        <span className="tag double-badge-right">{showType}</span>
        <div className="cst-dropdown-content">
          <em className="cst-dropdown-item" onClick={() => setShowType('All')}>
            All
          </em>
          <em
            className="cst-dropdown-item"
            onClick={() => setShowType('Active')}
          >
            Active
          </em>
          <em
            className="cst-dropdown-item"
            onClick={() => setShowType('Inactive')}
          >
            Inactive
          </em>
        </div>
      </div>
      <span
        className="tag is-dark"
        style={{ marginLeft: '16px' }}
        onClick={() => onSortClick(true)}
      >
        Name
        {sortingOrder[0] && (
          <i
            className={`fa order-icon ${
              sortingOrder[1] ? 'fa-arrow-down' : 'fa-arrow-up'
            }`}
          />
        )}
      </span>
    </th>
  );

  const renderDateBadge = (
    <th style={{ width: '145px', textAlign: 'center', cursor: 'pointer' }}>
      <span className="tag is-dark" onClick={() => onSortClick(false)}>
        Last Modified
        {!sortingOrder[0] && (
          <i
            className={`fa order-icon ${
              sortingOrder[1] ? 'fa-arrow-up' : 'fa-arrow-down'
            }`}
          />
        )}
      </span>
    </th>
  );

  if (loading) {
    return (
      <div className="tree load-container">
        <progress
          className="progress is-small is-primary"
          max="100"
          style={{ width: '50%' }}
        >
          15%
        </progress>
      </div>
    );
  }

  return (
    <div className="tree--hub container">
      <table className="tree--hub table">
        <thead>
          <tr>
            <th colSpan={3}>
              <nav className="breadcrumb">
                <ul>
                  <li>
                    <span className="icon">
                      <i
                        className="fa fa-folder"
                        style={{ color: '#1abc9c', cursor: 'pointer' }}
                        onClick={rootDirClicked}
                      />
                    </span>
                  </li>
                  {renderBreadcrumb()}
                </ul>
              </nav>
            </th>
            {renderNameBadge}
            {renderDateBadge}
          </tr>
        </thead>

        <tbody>{renderFiles()}</tbody>
      </table>
    </div>
  );
};

export default TreeHub;
