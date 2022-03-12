interface NavbarItemProps {
  label: string;
  desc?: string;
  onClick: () => void;
}

const DropdownItem: React.FC<NavbarItemProps> = ({ label, desc, onClick }) => {
  return (
    <b className="cst-navbar-item" onClick={onClick}>
      <div className="cst-navbar-content">
        <p>
          <strong>{label}</strong>
          <br />
          <small>{desc}</small>
        </p>
      </div>
    </b>
  );
};

export default DropdownItem;
