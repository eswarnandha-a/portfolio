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
  },
  {
    title: "Ride Right",
    description: "Ride sharing application for seamless transportation",
    label: "Transportation",
    lottie: rideRightLottie,
  },
  {
    title: "Spendwise",
    description: "AI money manager for smart financial decisions",
    label: "Finance",
    lottie: spendwiseLottie,
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
      z-index: 15;
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
            z-index: 5;
          }

          .corner-image {
            position: absolute;
            bottom: 16px;
            width: 40px;
            height: 40px;
            opacity: 0.8;
            transition: opacity 0.3s ease;
            z-index: 5;
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
                alt="" 
                className="corner-image corner-left"
              />
              <img 
                src={image36} 
                alt="" 
                className="corner-image corner-right"
              />
            </div>
          </ParticleCard>
        ))}
      </div>
    </>
  );
};

export default MagicBento;
