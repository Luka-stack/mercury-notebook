import './Dropdown.css';

import DropdownItem from './DropdownItem';

const OptionsDropdown = () => {
  return (
    <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
      <b className="cst-navbar-link">Options</b>

      <div className="cst-navbar-dropdown">
        <DropdownItem
          label="Auto save"
          desc="Disable/Enable auto saving file"
          onClick={() => {}}
        />
        <DropdownItem
          label="Auto save"
          desc="Disable/Enable auto saving file"
          onClick={() => {}}
        />
        <DropdownItem
          label="Shortcuts"
          desc="List of all shortcuts"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default OptionsDropdown;
