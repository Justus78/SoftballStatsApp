import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">

      <div className="footer-links">
        <div className="footer-left">
          <h2>Follow Me</h2>
          <ul className="social-links">
            <li>
              <a href="https://www.linkedin.com/in/matt-justus-947967239/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/Justus78" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
            
          </ul>
        </div>
        <div className="footer-right">
          <h2>Contact Us</h2>
          <p>Email: contact@softballstats.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Softball Stats. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
