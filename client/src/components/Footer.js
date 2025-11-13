import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Velora Global</h3>
          <p>Your trusted partner for worldwide shipping and logistics solutions. We deliver excellence, one shipment at a time.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><a href="tel:7396536693">+91 7396536693</a></p>
          <p><a href="mailto:support@veloraglobal.co.in">support@veloraglobal.co.in</a></p>
          <p>Plot No.C2, Ground Floor, Shanthi Classic Building, Huda Trade Centre, Lingampally, Hyderabad, Telangana-500019</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Velora Global. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;