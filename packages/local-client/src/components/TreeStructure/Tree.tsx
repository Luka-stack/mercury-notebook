import './Tree.css';

import { FileTree } from '../../state';
import TreeNode from './TreeNode';

interface TreeProps {
  treeData: FileTree[];
}

const Tree: React.FC<TreeProps> = ({ treeData }) => {
  return (
    <ul className="tree">
      {treeData.map((node) => (
        <TreeNode node={node} key={node.id} />
      ))}
    </ul>
  );
};

export default Tree;
