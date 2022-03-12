import './TreeHub.css';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Tree } from '../../state';

dayjs.extend(relativeTime);

const TreeHub = () => {
  const [currDir, setCurrDir] = useState<string>('');
  const [sortingOrder, setSortingOrder] = useState<[boolean, boolean]>([
    true,
    true,
  ]);

  const { error, loading, tree, root } = useTypedSelector(
    (state) => state.trees
  );

  const { fetchPartialTree } = useActions();

  const onSortClick = (name: boolean) => {
    setSortingOrder([name, !sortingOrder[1]]);
  };

  const onFolderClick = (tree: Tree) => {
    fetchPartialTree(tree.path.replace(root, '\\'));
    setCurrDir(tree.path.replace(root + '\\', ''));
  };

  const onBreadcrumbClick = (path: string) => {
    fetchPartialTree(path);
    setCurrDir(path);
  };

  useEffect(() => {
    fetchPartialTree('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderFiles = () => {
    if (tree === null) {
      return null;
    }

    let sorted: Tree[] = tree.children.slice();
    if (sortingOrder[0]) {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => +new Date(a.mtime) - +new Date(b.mtime));
    }

    if (!sortingOrder[1]) {
      sorted.sort((a, b) => a.name.localeCompare(b.name)).reverse();
    }

    return sorted.map((child) => (
      <tr>
        <td style={{ width: '0px' }}>
          <i
            className={`fa ${
              child.type === 'file' ? 'fa-book italic' : 'fa-folder'
            }`}
          ></i>
        </td>
        <td colSpan={2}>
          <span className="link" onClick={() => onFolderClick(child)}>
            {child.name}
          </span>
        </td>
        <td style={{ textAlign: 'center' }}>{dayjs(child.mtime).fromNow()}</td>
      </tr>
    ));
  };

  const renderBreadcrumb = () => {
    const paths = currDir.split('\\');
    const crumb = [{ name: paths[0], path: paths[0] }];

    for (let i = 1; i < paths.length; ++i) {
      crumb.push({
        name: paths[i],
        path: crumb[i - 1].path + '\\' + paths[i],
      });
    }

    return crumb.map((c) => (
      <li>
        <a onClick={() => onBreadcrumbClick(c.path)}>{c.name}</a>
      </li>
    ));
  };

  const renderNameBadge = (
    <th style={{ textAlign: 'right', cursor: 'pointer' }}>
      <span className="tag is-dark" onClick={() => onSortClick(true)}>
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
    <th style={{ width: '10%', textAlign: 'center', cursor: 'pointer' }}>
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
      <progress className="progress is-small is-primary" max="100">
        15%
      </progress>
    );
  }

  return (
    <div className="tree container">
      <table className="tree table">
        <thead>
          <tr>
            <th colSpan={2}>
              <nav className="breadcrumb">
                <ul>
                  <li>
                    <span className="icon">
                      <i
                        className="fa fa-folder"
                        style={{ color: '#375a7f', cursor: 'pointer' }}
                        onClick={() => onBreadcrumbClick('')}
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
