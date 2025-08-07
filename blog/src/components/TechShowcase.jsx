import React from 'react';
import './TechShowcase.css';
import TextPressure from './TextPressure';

// Import center image
import centreImage from '../assets/logos/centre.png';

// Import tech stack logos (7.png to 19.png)
import logo7 from '../assets/logos/7.png';
import logo8 from '../assets/logos/8.png';
import logo9 from '../assets/logos/9.png';
import logo10 from '../assets/logos/10.png';
import logo11 from '../assets/logos/11.png';
import logo12 from '../assets/logos/12.png';
import logo13 from '../assets/logos/13.png';
import logo14 from '../assets/logos/14.png';
import logo15 from '../assets/logos/15.png';
import logo16 from '../assets/logos/16.png';
import logo17 from '../assets/logos/17.png';
import logo18 from '../assets/logos/18.png';
import logo19 from '../assets/logos/19.png';
import logo20 from '../assets/logos/20.png';

const TechShowcase = () => {
  const techLogos = [
    logo7, logo8, logo9, logo10, logo11, logo12, logo13,
    logo14, logo15, logo16, logo17, logo18, logo19, logo20
  ];

  // Define positions and properties for scattered logos
  const logoPositions = [
    // Left side logos - more spread with uniform size
    { logo: logo7, x: '20%', y: '15%', size: '50px', rotation: '-15deg', delay: '0s' },
    { logo: logo8, x: '0%', y: '30%', size: '50px', rotation: '25deg', delay: '0.5s' },
    { logo: logo9, x: '12%', y: '45%', size: '50px', rotation: '-8deg', delay: '1s' },
    { logo: logo10, x: '2%', y: '60%', size: '50px', rotation: '18deg', delay: '1.5s' },
    { logo: logo11, x: '8%', y: '75%', size: '50px', rotation: '-22deg', delay: '2s' },
    { logo: logo12, x: '0%', y: '95%', size: '50px', rotation: '12deg', delay: '2.5s' },
    { logo: logo20, x: '10%', y: '5%', size: '50px', rotation: '8deg', delay: '3.2s' },
    
    // Right side logos - more spread with uniform size
    { logo: logo13, x: '95%', y: '5%', size: '50px', rotation: '20deg', delay: '0.2s' },
    { logo: logo14, x: '89%', y: '25%', size: '50px', rotation: '-12deg', delay: '0.7s' },
    { logo: logo15, x: '92%', y: '40%', size: '50px', rotation: '28deg', delay: '1.2s' },
    { logo: logo16, x: '85%', y: '55%', size: '50px', rotation: '-18deg', delay: '1.7s' },
    { logo: logo17, x: '94%', y: '70%', size: '50px', rotation: '15deg', delay: '2.2s' },
    { logo: logo18, x: '90%', y: '85%', size: '50px', rotation: '-25deg', delay: '2.7s' },
    { logo: logo19, x: '80%', y: '15%', size: '50px', rotation: '10deg', delay: '3s' },
  ];

  return (
    <div className="tech-showcase">
      {/* Tools Title at the top */}
      <div className="tools-title">
        <TextPressure
          text="STACKS & HACKS"
          textColor="#8B0000"
          minFontSize={100}
          width={true}
          weight={true}
          italic={false}
          stroke={true}
          strokeColor="#FF4444"
          strokeWidth={1}
        />
      </div>
      
      <div className="showcase-container">
        {/* Floating tech logos */}
        {logoPositions.map((item, index) => (
          <div
            key={index}
            className="floating-logo"
            style={{
              left: item.x,
              top: item.y,
              width: item.size,
              height: item.size,
              transform: `rotate(${item.rotation})`,
              animationDelay: item.delay,
            }}
          >
            <img src={item.logo} alt={`Tech ${index + 7}`} />
          </div>
        ))}
        
        {/* Magical particles effect */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Center image (Doctor Strange style) - positioned relative to main container */}
      <div className="center-character">
        <div className="character-glow">
          <img src={centreImage} alt="Developer" className="center-image" />
        </div>
      </div>
    </div>
  );
};

export default TechShowcase;
