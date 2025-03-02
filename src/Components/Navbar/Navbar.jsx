import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import SoftballLogo from '../SoftballLogo/SoftballLogo';

const Navbar = ({ onLogout, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Close menu when screen is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          <SoftballLogo /> <span>Softball Stats</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="menu">
          {isAuthenticated ? (
            <>
              <li><button><Link to="/" className="menu-link">Home</Link></button></li>
              <li><button><Link to="/teams" className="menu-link">Teams</Link></button></li>
              <li><button><Link to="/players" className="menu-link">My Players</Link></button></li>
              <li><button onClick={onLogout}><Link to="/" className="menu-link">Logout</Link></button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="menu-link">Login</Link></li>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <div className="menu-toggle">
          <button className="menu-button" onClick={toggleMenu} aria-label="Toggle Menu">
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/" className="menu-link" onClick={closeMenu}>Home</Link></li>
                <li><Link to="/teams" className="menu-link" onClick={closeMenu}>Teams</Link></li>
                <li><Link to="/players" className="menu-link" onClick={closeMenu}>My Players</Link></li>
                <li><Link to="/" className="menu-link" onClick={() => { onLogout(); closeMenu(); }}>Logout</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="menu-link" onClick={closeMenu}>Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
