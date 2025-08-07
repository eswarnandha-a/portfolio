import React from 'react';

// Import video files
import desktopVideo from '../../assets/desmode/des.mp4';
import mobileVideo from '../../assets/desmode/mob.mp4';

const Home = () => {
  return (
    <div className="home-section">
      <div className="home-container">
        <div className="responsive-video-container">
          {/* Desktop Video - 16:9 ratio */}
          <video
            className="desktop-video"
            src={desktopVideo}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Mobile Video - 9:16 ratio */}
          <video
            className="mobile-video"
            src={mobileVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
