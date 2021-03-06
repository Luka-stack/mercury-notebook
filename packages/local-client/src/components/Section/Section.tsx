import './Section.css';

import React, { useState } from 'react';
import ConfirmModal from '../Modals/ConfirmModal';
import { useActions } from '../../hooks/use-actions';
import { Direction } from '../../state/actions';
import { useTypedSelector } from '../../hooks/use-typed-selector';

interface SectionProps {
  id: string;
  description: JSX.Element;
}

const Section: React.FC<SectionProps> = ({ id, description, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const selectedSection = useTypedSelector(
    (state) => state.cells.selectedCell?.chapterId
  );

  const { deleteChapter, moveChapter } = useActions();

  const onDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    if ((children as Array<any>)[1].length) {
      setShowModal(true);
    } else {
      onConfirmModal();
    }
  };

  const onConfirmModal = () => {
    deleteChapter(id);
  };

  const onMoveClick = (
    event: React.MouseEvent,
    id: string,
    direction: string
  ) => {
    event.stopPropagation();
    moveChapter(id, direction as Direction);
  };

  return (
    <>
      <div className={`card ${selectedSection === id ? 'active-section' : ''}`}>
        <header className="card-header" onClick={() => setIsOpen(!isOpen)}>
          <button className="button section-button">
            <span className="icon">
              <i className={`fas ${isOpen ? 'fa-minus' : 'fa-plus'}`}></i>
            </span>
          </button>
          <button
            className="button section-button"
            onClick={(e) => onMoveClick(e, id, 'up')}
          >
            <span className="icon">
              <i className="fas fa-arrow-up"></i>
            </span>
          </button>
          <button
            className="button section-button"
            onClick={(e) => onMoveClick(e, id, 'down')}
          >
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
      </div>
      {showModal && (
        <ConfirmModal
          contnet="You are about to delete chapter with multiple cells."
          onCancel={() => setShowModal(false)}
          onConfirm={onConfirmModal}
        />
      )}
    </>
  );
};

export default Section;
