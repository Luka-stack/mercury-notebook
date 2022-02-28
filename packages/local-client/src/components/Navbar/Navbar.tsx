import './Navbar.css';

import FileDropdown from './dropdowns/FileDropdown';
import OptionsDropdown from './dropdowns/OptionsDropdown';

const Navbar = () => {
  return (
    <nav className="cst-navbar">
      <div className="cst-navbar-brand">
        <b>Mercury</b>
      </div>

      <div className="cst-navbar-menu">
        <div className="cst-navbar-start">
          <FileDropdown />
          <OptionsDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
