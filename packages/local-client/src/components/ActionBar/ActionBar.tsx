import './ActionBar.css';
import { useActions } from '../../hooks/use-actions';

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

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="icon">
          <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, 'up')}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(cellId, 'down')}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button
        className="button is-primary is-small close-button"
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
