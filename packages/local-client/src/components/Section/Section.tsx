import './Section.css';

import { useState } from 'react';
import ConfirmModal from '../Modals/ConfirmModal';
import { useActions } from '../../hooks/use-actions';

interface SectionProps {
  id: string;
  description: JSX.Element;
}

const Section: React.FC<SectionProps> = ({ id, description, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { deleteChapter } = useActions();

  const onDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if ((children as Array<any>)[1].length) {
      setShowModal(true);
    } else {
      onConfirm();
    }
  };

  const onConfirm = () => {
    deleteChapter(id);
  };

  return (
    <div className="card">
      <header className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <button className="button section-button">
          <span className="icon">
            <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
          </span>
        </button>
        <button className="button section-button">
          <span className="icon">
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
        <button className="button section-button">
          <span className="icon">
            <i className="fas fa-arrow-down"></i>
          </span>
        </button>
        <button
          className="button section-button close-button"
          onClick={onDeleteClick}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </header>
      <div className="card-content">
        {description}
        <div style={{ display: isOpen ? 'block' : 'none' }}>{children}</div>
      </div>

      <ConfirmModal
        title="Delete chapter"
        contnet="You are about to delete chapter with multiple cells."
        isShowing={showModal}
        setIsShowing={setShowModal}
        onConfirm={onConfirm}
      />
    </div>
  );
};

export default Section;
