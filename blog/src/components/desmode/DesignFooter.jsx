import React from 'react';
import './DesignFooter.css';

const DesignFooter = () => {
  return (
    <footer className="design-footer">
      <div className="design-footer-container">
        {/* Left Section - Quote and Social Icons */}
        <div className="design-footer-left">
          <div className="design-footer-quote">
            <h2>from sketch to screen</h2>
          </div>
          
          {/* Social Media Icons in squared sharp boxes */}
          <div className="design-social-icons">
            {/* Icon 38 */}
            <a href="https://in.linkedin.com/in/eswar-anand13" target="_blank" rel="noopener noreferrer" className="design-social-icon">
              <img src="/src/assets/social/38.png" alt="Social 38" />
            </a>
            
            {/* Icon 39 */}
            <a href="https://github.com/eswarnandha-a" target="_blank" rel="noopener noreferrer" className="design-social-icon">
              <img src="/src/assets/social/39.png" alt="Social 39" />
            </a>
            
            {/* Videos Button */}
            <button className="design-action-btn" onClick={() => {
              const videosSection = document.getElementById('videos');
              if (videosSection) {
                videosSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Videos
            </button>
            
            {/* Resume Button */}
            <a href="https://drive.google.com/drive/folders/1fRZithJMrjCdi0fbbvswZq7F1YGwzb_O?usp=drive_link" target="_blank" rel="noopener noreferrer" className="design-action-btn">
              Resume
            </a>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className="design-footer-right">
          <div className="design-contact-info">
            <p>Eswar Nandha A</p>
            <p>eswaranand1999@gmail.com</p>
            <p>636948951</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DesignFooter;