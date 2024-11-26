import React from 'react';
import '../style/Footer.css'; // Import your custom CSS file
import logo from '../Image/az01.png';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <img src={logo} alt="AZBOARD" className="footer-logo" />
            <h1 className="footer-description">
              AZBOARD is your trusted partner in home management and repairs, providing quality service and reliability.
            </h1>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Our Services</h5>
            <ul className="footer-services">
              <li>Home Repairs</li>
              <li>Property Management</li>
              <li>Renovations</li>
              <li>Cleaning Services</li>
              <li>Consultations</li>
            </ul>
          </div>

          <div className="footer-col">
            <h5 className="footer-heading">Follow Us</h5>
            <div className="footer-social-links">
              <a href="https://www.facebook.com" className="footer-social-link">Facebook</a>
              <a href="https://www.twitter.com" className="footer-social-link">Twitter</a>
              <a href="https://www.instagram.com" className="footer-social-link">Instagram</a>
              <a href="https://www.linkedin.com" className="footer-social-link">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2024 AZBOARD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
