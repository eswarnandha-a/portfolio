import React from 'react'
import './ExperienceGlass.css'
import Silk from './Silk'

export default function ExperienceGlass() {
  return (
    <div 
      className="experience-section" 
      style={{ 
        minHeight: '100vh', 
        height: 'auto',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Silk Background */}
      <div className="silk-background-container">
        <Silk 
          speed={20}
          scale={1}
          color="#2C0707"
          noiseIntensity={2.5}
          rotation={0.2}
        />
      </div>

      {/* Dark Overlay - Much darker */}
      <div className="dark-overlay-container">
      </div>

      {/* Simple Experience Content */}
      <div className="experience-content">
        <h2 style={{ 
          fontSize: '3rem', 
          color: 'white', 
          marginBottom: '4rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Experience
        </h2>
        
        {/* Company Experience Row */}
        <div className="experience-companies">
          {/* Crea8tiv - E1 */}
          <div className="experience-company-card">
            <img 
              src="/src/assets/e1.png" 
              alt="Crea8tiv" 
              style={{ 
                width: '180px', 
                height: '200px', 
                objectFit: 'contain',
                marginBottom: '1.5rem',
                opacity: 0.9 
              }}
            />
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h3 style={{ 
                color: '#FF4444', 
                fontSize: '1.2rem', 
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Crea8tiv
              </h3>
              <p style={{ 
                opacity: 0.9, 
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: '#FFB6C1'
              }}>
                Web Designer & Video Editor
              </p>
              <p style={{ 
                opacity: 0.7,
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                Jan 2025 - Mar 2025
              </p>
              <p style={{ 
                opacity: 0.8,
                fontSize: '1rem',
                lineHeight: '1.6',
                textAlign: 'justify'
              }}>
                Worked as a team member at a remote-first content delivery company where I led web development initiatives and actively contributed to video editing projects, creative design work, and comprehensive content management systems.
              </p>
            </div>
          </div>
          
          {/* Lysa Solutions - E2 */}
          <div className="experience-company-card">
            <img 
              src="/src/assets/e2.png" 
              alt="Lysa Solutions" 
              style={{ 
                width: '180px', 
                height: '200px', 
                objectFit: 'contain',
                marginBottom: '1.5rem',
                opacity: 0.9 
              }}
            />
            <div style={{ textAlign: 'center', width: '100%' }}>
              <h3 style={{ 
                color: '#FF4444', 
                fontSize: '1.2rem', 
                marginBottom: '0.5rem',
                fontWeight: 'bold'
              }}>
                Lysa Solutions
              </h3>
              <p style={{ 
                opacity: 0.9, 
                fontSize: '1.1rem',
                marginBottom: '0.5rem',
                color: '#FFB6C1'
              }}>
                Full Stack Developer
              </p>
              <p style={{ 
                opacity: 0.7,
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                May 2025 - Present
              </p>
              <p style={{ 
                opacity: 0.8,
                fontSize: '1rem',
                lineHeight: '1.6',
                textAlign: 'justify'
              }}>
                Built dynamic, scalable web applications using React and Django with a focus on responsive UI/UX and real-time data handling. Gained hands-on experience in full-stack development, integrating AI-powered features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
