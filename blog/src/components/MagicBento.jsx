import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { Player } from '@lottiefiles/react-lottie-player';
import image37 from "../assets/social/37.png";
import image36 from "../assets/social/36.png";
import seceSpaceLottie from "../assets/lotties/secespace.json";
import rideRightLottie from "../assets/lotties/rideright.json";
import spendwiseLottie from "../assets/lotties/spendwise.json";

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_GLOW_COLOR = "139, 0, 0";

const cardData = [
  {
    title: "SECE Space",
    description: "Local course manager for students and faculty",
    label: "Education",
    lottie: seceSpaceLottie,
    liveLink: "https://sece-space.vercel.app",
    githubLink: "https://github.com/eswarnandha-a/sece-space",
  },
  {
    title: "Ride Right",
    description: "Ride sharing application for seamless transportation",
    label: "Transportation",
    lottie: rideRightLottie,
    liveLink: null, // Will show popup
    githubLink: "https://github.com/eswarnandha-a/Rideshare",
  },
  {
    title: "Spendwise",
    description: "AI money manager for smart financial decisions",
    label: "Finance",
    lottie: spendwiseLottie,
    liveLink: "https://hackathon-seven-dusky.vercel.app",
    githubLink: "https://github.com/eswarnandha-a/hackathon",
  },
];

const ParticleCard = ({
  children,
  className = "",
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const isHoveredRef = useRef(false);

  const createParticle = useCallback(() => {
    if (!cardRef.current) return null;
    
    const rect = cardRef.current.getBoundingClientRect();
    const particle = document.createElement("div");
    particle.className = "magic-particle";
    particle.style.cssText = `
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(${glowColor}, 1);
      box-shadow: 
        0 0 8px rgba(${glowColor}, 1),
        0 0 16px rgba(${glowColor}, 0.9),
        0 0 24px rgba(${glowColor}, 0.7),
        0 0 32px rgba(${glowColor}, 0.5);
      pointer-events: none;
      z-index: 10;
      left: ${Math.random() * rect.width}px;
      top: ${Math.random() * rect.height}px;
    `;
    return particle;
  }, [glowColor]);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const particle = createParticle();
        if (!particle) return;

        cardRef.current.appendChild(particle);
        particlesRef.current.push(particle);

        gsap.fromTo(particle, 
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3 }
        );

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 120,
          y: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 3,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(particle, {
          opacity: 0.8,
          duration: 0.8,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, i * 150);
    }
  }, [particleCount, createParticle]);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.2,
        onComplete: () => particle.remove(),
      });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
      // Reset mouse position
      element.style.setProperty('--mouse-x', '50%');
      element.style.setProperty('--mouse-y', '50%');
    };

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      element.style.setProperty('--mouse-x', `${x}%`);
      element.style.setProperty('--mouse-y', `${y}%`);
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      clearParticles();
    };
  }, [animateParticles, clearParticles]);

  return (
    <div
      ref={cardRef}
      className={`magic-card ${className}`}
    >
      {children}
    </div>
  );
};

const MagicBento = () => {
  const [showDeploymentPopup, setShowDeploymentPopup] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleLiveLinkClick = (liveLink, e) => {
    e.stopPropagation();
    if (liveLink) {
      window.open(liveLink, '_blank', 'noopener,noreferrer');
    } else {
      setShowDeploymentPopup(true);
    }
  };

  const handleGithubClick = (githubLink, e) => {
    e.stopPropagation();
    window.open(githubLink, '_blank', 'noopener,noreferrer');
  };

  const closePopup = () => {
    setShowDeploymentPopup(false);
  };

  const handleIconHover = (iconType, cardTitle, hasLink, e) => {
    const rect = e.target.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
    setHoveredIcon({
      type: iconType,
      cardTitle,
      hasLink,
      message: iconType === 'live' 
        ? (hasLink ? 'View Live Site' : 'Deployment Coming Soon')
        : 'View GitHub Repository'
    });
  };

  const handleIconLeave = () => {
    setHoveredIcon(null);
  };

  return (
    <>
      <style>
        {`
          .magic-bento-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem;
            height: 480px;
          }

          .magic-card {
            position: relative;
            background: #060010;
            border: 2px solid rgba(139, 0, 0, 0.6);
            border-radius: 12px;
            padding: 2rem;
            overflow: hidden;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            aspect-ratio: 4/5;
            height: 100%;
            cursor: pointer;
          }

          .magic-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(139, 0, 0, 0.3) 0%, 
              rgba(139, 0, 0, 0.1) 30%,
              transparent 60%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: 1;
          }

          .magic-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                rgba(139, 0, 0, 1) 0%,
                rgba(139, 0, 0, 0.8) 20%,
                rgba(139, 0, 0, 0.4) 40%,
                transparent 70%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 2;
          }

          .magic-card:hover {
            border-color: rgba(139, 0, 0, 1);
            box-shadow: 
              0 8px 32px rgba(139, 0, 0, 0.4),
              0 0 60px rgba(139, 0, 0, 0.3),
              inset 0 1px 0 rgba(139, 0, 0, 0.4);
            transform: translateY(-4px);
          }

          .magic-card:hover::before {
            opacity: 1;
          }

          .magic-card:hover::after {
            opacity: 1;
          }

          .card-label {
            color: rgba(139, 0, 0, 1);
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 10px rgba(139, 0, 0, 0.5);
            z-index: 10;
            position: relative;
          }

          .card-title {
            color: white;
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 0.75rem 0;
            line-height: 1.3;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
            z-index: 10;
            position: relative;
          }

          .card-description {
            color: rgba(255, 255, 255, 0.85);
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0 0 1rem 0;
            text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
            z-index: 10;
            position: relative;
          }

          .lottie-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 200px;
            margin-top: auto;
            margin-bottom: 2rem;
            z-index: 10;
            position: relative;
          }

          .lottie-player {
            width: 180px;
            height: 180px;
            opacity: 0.8;
            transition: all 0.3s ease;
          }

          .magic-card:hover .lottie-player {
            opacity: 1;
            transform: scale(1.1);
          }

          .card-corners {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60px;
            pointer-events: none;
            z-index: 20;
          }

          .corner-image {
            position: absolute;
            bottom: 16px;
            width: 40px;
            height: 40px;
            opacity: 0.9;
            transition: all 0.3s ease;
            z-index: 25;
            cursor: pointer;
            border-radius: 8px;
            padding: 4px;
            pointer-events: auto;
          }

          .corner-image:hover {
            opacity: 1;
            transform: scale(1.2);
            background: rgba(139, 0, 0, 0.3);
            box-shadow: 0 0 20px rgba(139, 0, 0, 0.7);
          }

          .corner-left {
            left: 16px;
          }

          .corner-right {
            right: 16px;
          }

          .magic-card:hover .corner-image {
            opacity: 1;
          }

          /* Ensure corner images are always visible and clickable */
          .corner-image {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(5px);
          }

          /* Deployment Popup Styles - Matching Design Palette */
          .deployment-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px) saturate(150%);
            -webkit-backdrop-filter: blur(15px) saturate(150%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .deployment-popup {
            /* Advanced glassmorphism matching navbar style */
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 2px solid rgba(255, 255, 255, 0.15);
            border-radius: 24px;
            padding: 3rem 2.5rem;
            max-width: 450px;
            width: 90%;
            text-align: center;
            position: relative;
            overflow: hidden;
            
            /* Enhanced glass shadows */
            box-shadow: 
              0 25px 80px rgba(0, 0, 0, 0.4),
              0 8px 32px rgba(139, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1);
            
            animation: popupSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          /* Glass refraction effects for popup */
          .deployment-popup::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              transparent 15%,
              rgba(255, 255, 255, 0.8) 25%,
              rgba(255, 255, 255, 0.9) 50%,
              rgba(255, 255, 255, 0.8) 75%,
              transparent 85%,
              transparent 100%
            );
            border-radius: 24px 24px 0 0;
            opacity: 0.7;
            pointer-events: none;
          }

          .deployment-popup::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(
              90deg,
              transparent 0%,
              transparent 15%,
              rgba(255, 255, 255, 0.6) 25%,
              rgba(255, 255, 255, 0.7) 50%,
              rgba(255, 255, 255, 0.6) 75%,
              transparent 85%,
              transparent 100%
            );
            border-radius: 0 0 24px 24px;
            opacity: 0.5;
            pointer-events: none;
          }

          .deployment-popup h3 {
            color: rgba(255, 255, 255, 0.95);
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
            background: linear-gradient(135deg, #ffffff, #e0e0e0);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            position: relative;
            z-index: 1;
          }

          .deployment-popup p {
            color: rgba(255, 255, 255, 0.85);
            font-size: 1.1rem;
            margin-bottom: 2.5rem;
            line-height: 1.6;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            position: relative;
            z-index: 1;
          }

          .popup-close-btn {
            /* Red glass button matching design mode button */
            background: rgba(139, 0, 0, 0.15);
            backdrop-filter: blur(10px) saturate(180%);
            -webkit-backdrop-filter: blur(10px) saturate(180%);
            color: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(139, 0, 0, 0.4);
            border-radius: 16px;
            padding: 15px 30px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 1px;
            position: relative;
            overflow: hidden;
            z-index: 1;
            
            box-shadow: 
              0 8px 32px rgba(139, 0, 0, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              inset 0 -1px 0 rgba(139, 0, 0, 0.3);
          }

          .popup-close-btn:hover {
            background: rgba(139, 0, 0, 0.25);
            border-color: rgba(139, 0, 0, 0.6);
            backdrop-filter: blur(15px) saturate(200%);
            -webkit-backdrop-filter: blur(15px) saturate(200%);
            transform: translateY(-3px);
            color: white;
            
            box-shadow: 
              0 12px 40px rgba(139, 0, 0, 0.3),
              0 0 20px rgba(139, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(139, 0, 0, 0.4);
          }

          .popup-close-btn:active {
            transform: translateY(-1px);
            backdrop-filter: blur(8px) saturate(160%);
            -webkit-backdrop-filter: blur(8px) saturate(160%);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popupSlideIn {
            from { 
              opacity: 0;
              transform: translateY(-30px) scale(0.9);
            }
            to { 
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .magic-particle {
            animation: float 3s ease-in-out infinite, pulse 1.5s ease-in-out infinite alternate;
            filter: drop-shadow(0 0 3px rgba(139, 0, 0, 0.8));
          }

          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
            }
            33% { 
              transform: translateY(-12px) rotate(120deg); 
            }
            66% { 
              transform: translateY(12px) rotate(240deg); 
            }
          }

          @keyframes pulse {
            0% { 
              opacity: 0.6;
              box-shadow: 
                0 0 8px rgba(139, 0, 0, 1),
                0 0 16px rgba(139, 0, 0, 0.9),
                0 0 24px rgba(139, 0, 0, 0.7);
            }
            100% { 
              opacity: 1;
              box-shadow: 
                0 0 12px rgba(139, 0, 0, 1),
                0 0 24px rgba(139, 0, 0, 0.9),
                0 0 36px rgba(139, 0, 0, 0.8),
                0 0 48px rgba(139, 0, 0, 0.6);
            }
          }

          /* Custom Glassmorphism Tooltip */
          .glass-tooltip {
            position: fixed;
            z-index: 2000;
            pointer-events: none;
            transform: translateX(-50%) translateY(-100%);
            
            /* Advanced glassmorphism matching your design */
            background: rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            padding: 12px 16px;
            
            /* Enhanced glass shadows */
            box-shadow: 
              0 8px 32px rgba(0, 0, 0, 0.3),
              0 4px 16px rgba(139, 0, 0, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.3),
              inset 0 -1px 0 rgba(255, 255, 255, 0.1);
            
            /* Smooth animations */
            animation: tooltipFadeIn 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            animation-fill-mode: forwards;
          }

          .glass-tooltip::before {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid rgba(255, 255, 255, 0.12);
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
          }

          .glass-tooltip-content {
            color: rgba(255, 255, 255, 0.95);
            font-size: 0.875rem;
            font-weight: 600;
            text-align: center;
            white-space: nowrap;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
            letter-spacing: 0.5px;
          }

          .glass-tooltip.live-available .glass-tooltip-content {
            color: rgba(34, 197, 94, 0.95);
            text-shadow: 0 0 10px rgba(34, 197, 94, 0.3);
          }

          .glass-tooltip.live-unavailable .glass-tooltip-content {
            color: rgba(251, 191, 36, 0.95);
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.3);
          }

          .glass-tooltip.github .glass-tooltip-content {
            color: rgba(255, 255, 255, 0.95);
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }

          @keyframes tooltipFadeIn {
            from { 
              opacity: 0;
              transform: translateX(-50%) translateY(-100%) scale(0.9);
            }
            to { 
              opacity: 1;
              transform: translateX(-50%) translateY(-100%) scale(1);
            }
          }

          @media (max-width: 768px) {
            .magic-bento-container {
              grid-template-columns: 1fr;
              gap: 8px;
              height: auto;
              padding: 0.5rem;
            }
            
            .magic-card {
              aspect-ratio: 4/5;
              padding: 1.5rem;
            }

            /* Mobile tooltip adjustments */
            .glass-tooltip {
              font-size: 0.8rem;
              padding: 10px 14px;
              border-radius: 10px;
              max-width: 200px;
              white-space: normal;
              text-align: center;
            }

            .glass-tooltip-content {
              font-size: 0.8rem;
            }
            
            .card-title {
              font-size: 1.25rem;
            }
            
            .card-description {
              font-size: 0.875rem;
            }
          }

          @media (max-width: 480px) {
            .magic-card {
              padding: 1rem;
            }
            
            .card-title {
              font-size: 1.125rem;
            }
          }
        `}
      </style>

      <div className="magic-bento-container">
        {cardData.map((card, index) => (
          <ParticleCard key={index}>
            <div>
              <div className="card-label">{card.label}</div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
            
            <div className="lottie-container">
              <Player
                autoplay
                loop
                src={card.lottie}
                className="lottie-player"
              />
            </div>
            
            <div className="card-corners">
              <img 
                src={image37} 
                alt="Live Link" 
                className="corner-image corner-left"
                onClick={(e) => handleLiveLinkClick(card.liveLink, e)}
                onMouseEnter={(e) => handleIconHover('live', card.title, !!card.liveLink, e)}
                onMouseLeave={handleIconLeave}
              />
              <img 
                src={image36} 
                alt="GitHub Repository" 
                className="corner-image corner-right"
                onClick={(e) => handleGithubClick(card.githubLink, e)}
                onMouseEnter={(e) => handleIconHover('github', card.title, true, e)}
                onMouseLeave={handleIconLeave}
              />
            </div>
          </ParticleCard>
        ))}
      </div>

      {/* Custom Glassmorphism Tooltip */}
      {hoveredIcon && (
        <div 
          className={`glass-tooltip ${hoveredIcon.type} ${hoveredIcon.hasLink ? 'available' : 'unavailable'}`}
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y
          }}
        >
          <div className="glass-tooltip-content">
            {hoveredIcon.message}
          </div>
        </div>
      )}

      {/* Deployment Popup */}
      {showDeploymentPopup && (
        <div className="deployment-popup-overlay" onClick={closePopup}>
          <div className="deployment-popup" onClick={(e) => e.stopPropagation()}>
            <h3>🚀 Deployment Coming Soon</h3>
            <p>This project is currently being prepared for deployment. Check back soon to see it live!</p>
            <button className="popup-close-btn" onClick={closePopup}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MagicBento;
