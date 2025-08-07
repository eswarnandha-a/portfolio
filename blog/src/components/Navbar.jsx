import React, { useState } from 'react';
import portLogo from '../assets/portlogo.png';

const Navbar = ({ onDesignModeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('mobile-menu-backdrop')) {
      setIsMenuOpen(false);
    }
  };

  const handleDesignModeClick = () => {
    if (onDesignModeClick) {
      onDesignModeClick();
    }
  };

  return (
    <>
      <nav className="navbar-wrapper">
        {/* Mobile Layout */}
        <div className="mobile-top-bar">
          <button 
            className="mobile-logo-btn"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={portLogo} alt="Portfolio Logo" />
          </button>
          
          <button 
            className="design-mode-btn mobile-design-btn"
            onClick={handleDesignModeClick}
          >
            Design Mode
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <a href="#experience" className="nav-link" onClick={handleNavLinkClick}>Experience</a>
          <a href="#projects" className="nav-link" onClick={handleNavLinkClick}>Projects</a>
          <a href="#tech-stack" className="nav-link" onClick={handleNavLinkClick}>Tech Stack</a>
          <a href="#contact" className="nav-link" onClick={handleNavLinkClick}>Contact</a>
        </div>

        {/* Desktop Layout */}
        <div className="glass-navbar">
          <div className="nav-container">
            <div className="nav-brand">
              <img 
                src={portLogo} 
                alt="Portfolio Logo" 
                className="nav-logo" 
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* Desktop Menu */}
            <div className="nav-menu desktop-menu">
              <a href="#experience" className="nav-link">Experience</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#tech-stack" className="nav-link">Tech Stack</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
          </div>
        </div>
        
        <button 
          className="design-mode-btn desktop-design-btn"
          onClick={handleDesignModeClick}
        >
          Design Mode
        </button>
      </nav>
      
      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-backdrop" 
          onClick={handleBackdropClick}
        />
      )}
    </>
  );
};

export default Navbar;
