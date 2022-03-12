import './HubModal.css';

import { ChangeEvent, useRef } from 'react';
import { useActions } from '../../hooks/use-actions';

const HubModal = () => {
  const fileRef = useRef<any>();

  const { createNotebook } = useActions();

  const onExistingClick = () => {
    const input: HTMLInputElement = fileRef.current;
    input.click();
  };

  const onNewClick = () => {
    createNotebook();
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      window.open(`/notebooks/${event.target.files[0].name}`);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-card">
        <section className="modal-card-body" style={{ borderRadius: '16px' }}>
          <div className="entry button-wrapper">
            <button
              className="button is-primary"
              style={{ marginBottom: '10px' }}
              onClick={onNewClick}
            >
              Create New Notebook
            </button>
            <button
              className="button is-primary"
              style={{ marginTop: '10px' }}
              onClick={onExistingClick}
            >
              Open Existing Notebook
            </button>
          </div>
        </section>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".js"
        style={{ display: 'none' }}
        onChange={onFileSelect}
      />
    </div>
  );
};

export default HubModal;
