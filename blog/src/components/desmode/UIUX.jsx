import React from 'react';
import TiltedCard from './TiltedCard';
import sokkaiLottie from '../../assets/desmode/sokkai.json';
import fanwikiLottie from '../../assets/desmode/fanwiki.json';
import alumnihubLottie from '../../assets/desmode/alumnihub.json';
import figmaIcon from '../../assets/desmode/figma.png';

const UIUX = () => {
  const cards = [
    {
      lottieSrc: sokkaiLottie,
      title: "Sokkai",
      description: "Designed the UI for a client's fashion e-commerce website, focusing on aesthetic appeal, navigation, and a seamless shopping experience.",
      lottieSize: "w-64 h-64", // Consistent size for all cards
      figmaLink: "https://www.figma.com/proto/cvVHN09MC1KIa8NKpmwgRu/Sokkai.in?node-id=407-2&p=f&t=OJeaPCNSXz8cIlua-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=407%3A2",
    },
    {
      lottieSrc: fanwikiLottie,
      title: "Fan Wiki",
      description: "Designed a fan wiki for Stranger Things with an immersive layout showcasing characters, episodes, and storylines. Focused on dark theme aesthetics and intuitive navigation to enhance the fan experience.",
      lottieSize: "w-64 h-64", // Consistent size for all cards
      figmaLink: "https://www.figma.com/proto/WejKvcQlX9ap72ucHIuAuN/MU-JAIPUR?node-id=16-24&p=f&t=cXmPKpKSSADkuUoI-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=16%3A24",
    },
    {
      lottieSrc: alumnihubLottie,
      title: "Alumni Hub",
      description: "Designed the UI for a website connecting school alumni, fostering networking. Supports long-term alumni relations with the school. A Project for School in Salem.",
      lottieSize: "w-64 h-64", // Consistent size for all cards - changed from w-48 h-48
      figmaLink: "https://www.figma.com/proto/4qPv3x4fpRMBEG3u1kkk7s/AlumniHUB?t=8I9BwmxOpwmxNwQ0-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1&node-id=734-722&starting-point-node-id=734%3A722",
    },
  ];

  return (
    <div className="uiux-section min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            UI/UX Projects
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="uiux-cards-grid grid grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col items-center">
              <TiltedCard
                lottieSrc={card.lottieSrc}
                title={card.title}
                containerHeight="300px"
                containerWidth="100%"
                cardHeight="280px"
                cardWidth="280px"
                scaleOnHover={1.05}
                rotateAmplitude={28}
                showMobileWarning={false}
                showTooltip={false}
                lottieSize={card.lottieSize}
                showFigmaIcon={false}
              />
              {/* Description with increased margin */}
              <div className="mt-12 text-center max-w-xs">
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {card.description}
                </p>
                {/* Figma Button below description with text */}
                <div className="figma-button-container">
                  <button
                    onClick={() => window.open(card.figmaLink, '_blank')}
                    className="figma-btn-with-text"
                  >
                    <img 
                      src={figmaIcon} 
                      alt="Figma"
                    />
                  </button>
                  <span className="figma-text">View Prototype</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UIUX;