import React, { useState, useEffect } from 'react';
import DesignNavbar from './DesignNavbar';
import Home from './Home';
import UIUX from './UIUX';
import Gallery from './Gallery';
import Videos from './Videos';
import Works from './Works';
import './DesignMode.css';

const DesignMode = ({ onDevModeClick }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'works', 'uiux', 'gallery', 'videos'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="design-mode">
      <DesignNavbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onDevModeClick={onDevModeClick}
        scrollToSection={scrollToSection}
      />
      <main className="design-content">
        <section id="home">
          <Home />
        </section>
       
          {/* Works section - to be added later */}
          <section id="works">
          <Works />
        </section>
        <section id="uiux">
          <UIUX />
        </section>
        <section id="gallery">
          <Gallery />
        </section>
        <section id="videos">
          <Videos />
        </section>
      </main>
    </div>
  );
};

export default DesignMode;
