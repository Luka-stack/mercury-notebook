interface ShortcutsModalProps {
  isShowing: boolean;
  setIsShowing: (status: boolean) => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isShowing,
  setIsShowing,
}) => {
  return (
    <div className={`modal ${isShowing && 'is-active'}`}>
      <div className="modal-card">
        <header className="modal-card-head">
          <button
            className="delete is-medium"
            onClick={() => setIsShowing(false)}
          ></button>
        </header>

        <section className="modal-card-body">
          <ul className="shortcuts">
            <li className="panel-block">
              Run selected cell
              <span className="button is-small">Alt + Enter</span>
            </li>
            <li className="panel-block">
              New code editor (ide)
              <span className="button is-small">Alt + i</span>
            </li>
            <li className="panel-block">
              Add text editor (markdown)
              <span className="button is-small">Alt + t</span>
            </li>
            <li className="panel-block">
              Add section
              <span className="button is-small">Alt + s</span>
            </li>
            <li className="panel-block">
              Save notebook
              <div>
                <span className="button is-small">Control + s</span>
                <span className="button is-small">Command + s</span>
              </div>
            </li>
            <li className="panel-block">
              Open notebook
              <div>
                <span className="button is-small">Control + o</span>
                <span className="button is-small">Command + o</span>
              </div>
            </li>
            <li className="panel-block">
              Create new notebook
              <div>
                <span className="button is-small">Control + n</span>
                <span className="button is-small">Command + n</span>
              </div>
            </li>
          </ul>
        </section>

        <footer className="modal-card-foot">
          {/* <button className="button is-primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
          <button className="button" onClick={() => setIsShowing(false)}>
            {cancelLabel}
          </button> */}
        </footer>
      </div>
    </div>
  );
};

export default ShortcutsModal;
