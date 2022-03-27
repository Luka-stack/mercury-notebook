import { useState } from 'react';
import { useActions } from '../../hooks/use-actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { FileTree } from '../../state';
import Tree from './Tree';

interface TreeNodeProps {
  node: FileTree;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  const [showChildren, setShowChildren] = useState(false);

  const modalFile = useTypedSelector((state) => state.trees.modalFile);

  const { selectModalFile } = useActions();

  const handleClick = () => {
    if (node.type === 'directory') {
      setShowChildren(!showChildren);
    } else {
      selectModalFile(node.path);
    }
  };

  const renderLabel = () => {
    let classes = 'fa fa-angle-down';

    if (node.type === 'file') {
      classes = node.active ? 'fa fa-book used' : 'fa fa-book';
    } else {
      classes = showChildren ? 'fa fa-angle-up' : 'fa fa-angle-down';
    }

    return (
      <>
        <i className={classes} style={{ marginRight: '8px' }} />
        <span>{node.name}</span>
      </>
    );
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={modalFile === node.path ? 'active' : ''}
      >
        {renderLabel()}
      </div>
      <ul style={{ paddingLeft: '10px' }}>
        {showChildren && <Tree treeData={node.children} />}
      </ul>
    </>
  );
};

export default TreeNode;
