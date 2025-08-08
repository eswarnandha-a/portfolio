import React, { useState, useEffect } from 'react';
import Silk from '../Silk';

// Load Alta Regular font
import altaRegularFont from '../../assets/desmode/alta-regular.otf';

const fontFace = new FontFace('Alta-Regular', `url(${altaRegularFont})`);
fontFace.load().then(() => {
  document.fonts.add(fontFace);
}).catch(err => {
  console.log('Font loading failed:', err);
});

const Works = () => {
  const freelanceItems = [
    {
      id: 1,
      title: "Program Professor YouTube Channel",
      description: "Created educational content for Program Professor YouTube channel, producing JAVA programming tutorials."
    },
    {
      id: 2,
      title: "Logo & Brand Design",
      description: "Designed unique logos for start-ups and college clubs, delivering brand-focused visual identities."
    },
    {
      id: 3,
      title: "SOULFUL AI - UI/UX & Branding",
      description: "Worked as UI/UX Developer and Branding Lead for SOULFUL AI, a student-led emerging start-up."
    },
    {
      id: 4,
      title: "EDC Media Manager",
      description: "Served as Media Manager for the EDC at Sri Eshwar College, managing event coverage and promotions."
    },
    {
      id: 5,
      title: "Creative Design Services",
      description: "Designed posters, banners, and digital creatives for Ariyatra Tours & Travels and college events."
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    section: {
      minHeight: isMobile ? 'auto' : '100vh',
      height: isMobile ? 'auto' : '100vh',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      fontFamily: "'Alta-Regular', 'Alta', sans-serif",
      padding: isMobile ? '2rem 1rem' : '0',
    },
    heading: {
      fontSize: isMobile ? '2.5rem' : '4rem',
      color: '#000000',
      marginBottom: isMobile ? '2rem' : '3rem',
      fontWeight: 'normal',
      textAlign: 'center',
      fontFamily: "'Alta-Regular', 'Alta', sans-serif",
      letterSpacing: '3px',
      textTransform: 'uppercase',
    },
    cardsContainer: {
      display: 'flex',
      width: '100%',
      maxWidth: '1400px',
      height: 'auto',
      margin: '0 auto',
      gap: isMobile ? '1.5rem' : '0.5rem',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '0 1rem' : '0 2rem',
    },
    card: (index, isHovered) => ({
      width: isMobile 
        ? '100%' 
        : isHovered 
          ? '400px' 
          : '200px',
      height: isMobile 
        ? isHovered 
          ? 'auto' 
          : '80px'
        : isHovered 
          ? '280px' 
          : '200px',
      minHeight: isMobile ? '80px' : '200px',
      backgroundColor: isHovered ? '#000000' : '#ffffff',
      color: isHovered ? '#ffffff' : '#000000',
      border: `1px solid ${isHovered ? '#ffffff' : '#000000'}`,
      borderRadius: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: isMobile ? 'flex-start' : 'center',
      padding: isMobile 
        ? isHovered 
          ? '1.5rem 1rem' 
          : '1rem'
        : isHovered 
          ? '2rem' 
          : '1rem',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      position: 'relative',
      zIndex: isHovered ? 10 : 1,
      transform: isHovered && !isMobile ? 'scale(1.05) translateY(-10px)' : 'scale(1)',
      boxShadow: isHovered 
        ? '0 20px 40px rgba(0, 0, 0, 0.5)' 
        : '0 5px 15px rgba(0, 0, 0, 0.1)',
    }),
    cardContent: {
      zIndex: 2,
      position: 'relative',
    },
    cardTitle: (isHovered) => ({
      fontSize: isMobile 
        ? '1.1rem' 
        : isHovered 
          ? '1.8rem' 
          : '1.2rem',
      marginBottom: isMobile ? '0.5rem' : isHovered ? '1.2rem' : '0.8rem',
      fontWeight: 'normal',
      fontFamily: "'Alta-Regular', 'Alta', sans-serif",
      letterSpacing: '2px',
      lineHeight: '1.2',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      textTransform: 'uppercase',
    }),
    cardDescription: (isHovered) => ({
      fontSize: isMobile 
        ? '0.85rem' 
        : isHovered 
          ? '1.1rem' 
          : '0.9rem',
      lineHeight: '1.4',
      opacity: isHovered ? '1' : '0',
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: '300',
      transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
      display: !isHovered ? 'none' : 'block',
      overflow: 'visible',
      letterSpacing: '0.5px',
      marginTop: isMobile ? '0.5rem' : '0.8rem',
      maxHeight: !isHovered ? '0' : 'none',
    }),

  };

  return (
    <section id="works" style={styles.section}>
      <h2 style={styles.heading}>Freelance Works</h2>
      
      <div style={styles.cardsContainer}>
        {freelanceItems.map((item, index) => (
          <div 
            key={item.id}
            style={styles.card(index, hoveredIndex === index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle(hoveredIndex === index)}>{item.title}</h3>
              <p style={styles.cardDescription(hoveredIndex === index)}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
