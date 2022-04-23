import './CellListItem.css';

import { useState } from 'react';

import { Cell } from '../../../state';
import ActionBar from '../../ActionBar/ActionBar';
import CodeCell from '../../CodeCell/CodeCell';
import TextEditor from '../../TextEditor/TextEditor';
import { useTypedSelector } from '../../../hooks/use-typed-selector';
import { useActions } from '../../../hooks/use-actions';

interface CellListItemProps {
  cell: Cell;
  showActions?: boolean;
}

const CellListItem: React.FC<CellListItemProps> = ({
  cell,
  showActions = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const selectedCell = useTypedSelector((state) => state.cells.selectedCell);

  const { selectCodeCell } = useActions();

  const onCellClicked = (cell: Cell) => {
    if (selectedCell && selectedCell.id === cell.id) {
      return;
    }

    selectCodeCell(cell);
  };

  const activeCellStyle = cell.id === selectedCell?.id ? 'active-cell' : '';

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
    <div
      className={`cell-list-item ${activeCellStyle}`}
      onClick={() => onCellClicked(cell)}
    >
      {cell.type === 'code' ? (
        <>
          <div className="action-bar-wrapper">
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
