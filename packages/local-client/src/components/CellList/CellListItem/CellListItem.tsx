import './CellListItem.css';

import { useState } from 'react';

import { Cell } from '../../../state';
import ActionBar from '../../ActionBar/ActionBar';
import CodeCell from '../../CodeCell/CodeCell';
import TextEditor from '../../TextEditor/TextEditor';

interface CellListItemProps {
  cell: Cell;
  showActions?: boolean;
}

const CellListItem: React.FC<CellListItemProps> = ({
  cell,
  showActions = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const renderTextEditor = (
    <>
      {isOpen ? (
        <>
          <TextEditor cell={cell} />
          <ActionBar
            cellId={cell.id}
            chapterId={cell.chapterId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      ) : (
        <div className="action-bar-wrapper" onClick={() => setIsOpen(!isOpen)}>
          <ActionBar
            cellId={cell.id}
            chapterId={cell.chapterId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="cell-list-item">
      {cell.type === 'code' ? (
        <>
          <div
            className="action-bar-wrapper"
            onClick={() => setIsOpen(!isOpen)}
          >
            {showActions && (
              <ActionBar
                cellId={cell.id}
                chapterId={cell.chapterId}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            )}
          </div>

          <div style={{ display: isOpen ? 'block' : 'none' }}>
            <CodeCell cell={cell} />
          </div>
        </>
      ) : (
        <>{showActions ? renderTextEditor : <TextEditor cell={cell} />}</>
      )}
    </div>
  );
};

export default CellListItem;
