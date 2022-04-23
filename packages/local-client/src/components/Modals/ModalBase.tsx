import CSS from 'csstype';

interface ModalBaseProps {
  section: JSX.Element;
  sectionStyle?: CSS.Properties;
  footer?: JSX.Element;
  onCancel: () => void;
}

const ModalBase: React.FC<ModalBaseProps> = ({
  section,
  footer,
  sectionStyle,
  onCancel,
}) => {
  return (
    <div className="modal is-active">
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete is-medium" onClick={onCancel}></button>
        </header>

        <section style={sectionStyle} className="modal-card-body">
          {section}
        </section>

        <footer className="modal-card-foot">{footer}</footer>
      </div>
    </div>
  );
};

export default ModalBase;
