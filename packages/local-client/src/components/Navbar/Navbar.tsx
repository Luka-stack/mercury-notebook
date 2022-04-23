import './Navbar.css';

import { ReactNode } from 'react';

interface NavbarProps {
  width?: string;
  children?: ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ width, children }) => {
  return (
    <div style={{ backgroundColor: '#375a7f' }}>
      <div className="cst-navbar container">
        <nav className="cst-navbar" style={{ width: width }}>
          <div className="cst-navbar-brand">
            <b>Mercury</b>
          </div>

          <div className="cst-navbar-menu">
            <div className="cst-navbar-start">{children}</div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
