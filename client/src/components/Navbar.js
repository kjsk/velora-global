import React from 'react';
import { Link } from 'react-router-dom';
import VeloraLogo from './Logo';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo-container">
          <Link to="/">
            <VeloraLogo width={180} height={50} />
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/quote">Get a Quote</Link></li>
          <li><Link to="/labeling">Labeling</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;