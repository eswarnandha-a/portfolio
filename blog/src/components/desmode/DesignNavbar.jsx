import React, { useState } from 'react';
import desLogo from '../../assets/desmode/deslogo.png';

const DesignNavbar = ({ activeSection, setActiveSection, onDevModeClick, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { id: 'works', label: 'Works' },
    { id: 'uiux', label: 'UI/UX' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'videos', label: 'Videos' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (itemId) => {
    scrollToSection(itemId);
    setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  const handleLogoClick = () => {
    // On desktop, go to home
    if (window.innerWidth > 768) {
      scrollToSection('home');
      setActiveSection('home');
    } else {
      // On mobile, toggle dropdown
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <nav className="design-navbar">
      <div className="design-nav-container">
        {/* Logo */}
        <div className="design-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={desLogo} alt="Design Logo" />
        </div>

        {/* Navigation Items */}
        <div className={`design-nav-items ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`design-nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Dev Mode Button */}
        <div className="design-nav-dev">
          <button 
            className="dev-mode-btn"
            onClick={onDevModeClick}
          >
            DEV MODE
          </button>
        </div>
      </div>
      
      {/* Moving Line Animation - Part of navbar */}
      <div className="moving-line"></div>
    </nav>
  );
};

export default DesignNavbar;
