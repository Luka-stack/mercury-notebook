interface ConfirmModalProps {
  title: string;
  contnet: string;
  confirmLabel?: string;
  cancelLabel?: string;

  isShowing: boolean;
  setIsShowing: (status: boolean) => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  contnet,
  confirmLabel = 'Proceed',
  cancelLabel = 'Cancel',
  isShowing,
  setIsShowing,
  onConfirm,
}) => {
  return (
    <div className={`modal ${isShowing && 'is-active'}`} id="myModal">
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            onClick={() => setIsShowing(false)}
          ></button>
        </header>

        <section className="modal-card-body">{contnet}</section>

        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button className="button" onClick={() => setIsShowing(false)}>
            {cancelLabel}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmModal;
