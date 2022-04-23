interface NavbarItemProps {
  label: string;
  desc?: string;
  active?: boolean;
  onClick: () => void;
}

const DropdownItem: React.FC<NavbarItemProps> = ({
  label,
  desc,
  active = false,
  onClick,
}) => {
  return (
    <b
      className={`cst-navbar-item ${active ? 'active' : ''} `}
      onClick={onClick}
    >
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
