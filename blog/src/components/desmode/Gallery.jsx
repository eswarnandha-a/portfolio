import React from 'react';
import svg1 from '../../assets/desmode/svg1.svg';
import svg2 from '../../assets/desmode/svg2.svg';

const Gallery = () => {
  return (
    <div className="gallery-section">
      <div className="gallery-grid-svgs">
        <div className="gallery-svg-item">
          <img src={svg1} alt="Animated Graphic Design 1" />
        </div>
        <div className="gallery-svg-item">
          <img src={svg2} alt="Animated Graphic Design 2" />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
