import { useState } from 'react'
import DarkVeil from './components/DarkVeil'
import Navbar from './components/Navbar'
import GlassForm from './components/GlassForm'
import ShinyText from './components/ShinyText'
import TechShowcase from './components/TechShowcase'
import MagicBento from './components/MagicBento'
import ExperienceGlass from './components/ExperienceGlass'
import DesignMode from './components/desmode/DesignMode'

import eswarImage from './assets/eswar.jpg'
import conredImage from './assets/conred.png'
import './components/glassmorphism.css'
import './App.css'

function App() {
  const [isDesignMode, setIsDesignMode] = useState(false);

  const handleDesignModeToggle = () => {
    setIsDesignMode(!isDesignMode);
  };

  if (isDesignMode) {
    return <DesignMode onDevModeClick={() => setIsDesignMode(false)} />;
  }

  return (
    <>
      {/* Background Layer */}
      <div className="background-container">
        <DarkVeil 
          hueShift={240}
          noiseIntensity={0.1}
          scanlineIntensity={0.1}
          speed={0.3}
          scanlineFrequency={0.01}
          warpAmount={0.2}
          resolutionScale={1}
        />
      </div>

      {/* Glassmorphism Navbar */}
      <Navbar onDesignModeClick={handleDesignModeToggle} />

      {/* Main Content */}
      <div className="main-content">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1><ShinyText text="Designer" speed={3} /></h1>
              <h1>&amp;</h1>
              <h1><ShinyText text="Developer" speed={3} /></h1>
              <p className="hero-bio">I craft interactive, user-friendly, and visually compelling content that not only looks great but also resonates with audiences.</p>
              <p className="hero-bio">Transforming concepts into captivating digital experiences is what I do best.</p>
            </div>
            <div className="hero-image">
              <img src={eswarImage} alt="Eswar" className="profile-image" />
            </div>
          </div>
        </div>

        {/* Experience Section with Glass Cursor */}
        <section id="experience">
          <ExperienceGlass />
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section">
          <div className="section-header">
            <h2>Projects</h2>
          </div>
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="139, 0, 0"
          />
        </section>

        {/* Tech Showcase Section */}
        <section id="tech-stack">
          <TechShowcase />
        </section>

        <div className="content-section">
          <div className="contact-section" id="contact">
            {/* Contact Content - Takes up 60% of viewport */}
            <div className="contact-content">
              <div className="contact-image">
                <img src={conredImage} alt="Contact" className="conred-image" />
              </div>
              <div className="contact-form">
                <GlassForm />
              </div>
            </div>
            
            {/* Footer Content - Takes up 40% of viewport */}
            <footer className="footer">
              <div className="footer-content">
                <div className="footer-bottom">
                  {/* Slogan and Social Icons on the left */}
                  <div className="footer-left">
                    <div className="footer-main-text">
                      <h2>Bringing Vision to Visuals</h2>
                    </div>
                    
                    {/* Social Media Icons (4 logos) */}
                    <div className="social-icons">
                      {/* LinkedIn */}
                      <a href="https://in.linkedin.com/in/eswar-anand13" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="/src/assets/social/31.png" alt="LinkedIn" />
                      </a>
                      
                      {/* GitHub */}
                      <a href="https://github.com/eswarnandha-a" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="/src/assets/social/32.png" alt="GitHub" />
                      </a>
                      
                      {/* Instagram */}
                      <a href="https://www.instagram.com/eswaranand_/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <img src="/src/assets/social/33.png" alt="Instagram" />
                      </a>
                      

                      
                      {/* Resume Button */}
                      <a href="https://drive.google.com/drive/folders/1fRZithJMrjCdi0fbbvswZq7F1YGwzb_O?usp=drive_link" target="_blank" rel="noopener noreferrer" className="resume-btn">
                        Resume
                      </a>
                    </div>
                  </div>

                  {/* Contact Info on the right */}
                  <div className="footer-right">
                    <div className="contact-info">
                      <p>Eswar Nandha A</p>
                      <p>eswaranand1999@gmail.com</p>
                      <p>636948951</p>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
