import './ActionBar.css';
import React from 'react';

import { useActions } from '../../hooks/use-actions';
import { Direction } from '../../state/actions';

interface ActionBarProps {
  cellId: string;
  chapterId: string;
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  cellId,
  chapterId,
  isOpen,
  setIsOpen,
}) => {
  const { moveCell, deleteCell } = useActions();

  const onMoveCell = (
    event: React.MouseEvent,
    id: string,
    direction: string,
    chapterId: string
  ) => {
    event.stopPropagation();
    moveCell(id, direction as Direction, chapterId);
  };

  return (
    <div className="action-bar">
      <button className="button is-small" onClick={() => setIsOpen(!isOpen)}>
        <span className="icon">
          <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
        </span>
      </button>
      <button
        className="button is-small"
        onClick={(e) => onMoveCell(e, cellId, 'up', chapterId)}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-small"
        onClick={(e) => onMoveCell(e, cellId, 'down', chapterId)}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-small close-button"
        onClick={() => deleteCell(cellId, chapterId)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
