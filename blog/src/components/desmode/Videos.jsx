import React, { useRef, useState } from 'react';
import v1 from '../../assets/desmode/v1.mp4';
import v2 from '../../assets/desmode/v2.mp4';
import v3 from '../../assets/desmode/v3.mp4';
import v4 from '../../assets/desmode/v4.mp4';

const Videos = () => {
  const [videoStates, setVideoStates] = useState({
    v1: { isPlaying: false, isMuted: true },
    v2: { isPlaying: false, isMuted: true },
    v3: { isPlaying: false, isMuted: true },
    v4: { isPlaying: false, isMuted: true }
  });

  const videoRefs = {
    v1: useRef(null),
    v2: useRef(null),
    v3: useRef(null),
    v4: useRef(null)
  };

  const handleMouseEnter = (videoKey) => {
    const video = videoRefs[videoKey].current;
    if (video) {
      video.play();
      setVideoStates(prev => ({
        ...prev,
        [videoKey]: { ...prev[videoKey], isPlaying: true }
      }));
    }
  };

  const handleMouseLeave = (videoKey) => {
    const video = videoRefs[videoKey].current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setVideoStates(prev => ({
        ...prev,
        [videoKey]: { ...prev[videoKey], isPlaying: false }
      }));
    }
  };

  const togglePlayPause = (videoKey, e) => {
    e.stopPropagation();
    const video = videoRefs[videoKey].current;
    if (video) {
      if (videoStates[videoKey].isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setVideoStates(prev => ({
        ...prev,
        [videoKey]: { ...prev[videoKey], isPlaying: !prev[videoKey].isPlaying }
      }));
    }
  };

  const toggleMute = (videoKey, e) => {
    e.stopPropagation();
    const video = videoRefs[videoKey].current;
    if (video) {
      video.muted = !video.muted;
      setVideoStates(prev => ({
        ...prev,
        [videoKey]: { ...prev[videoKey], isMuted: !prev[videoKey].isMuted }
      }));
    }
  };

  const videos = [
    { key: 'v1', src: v1, alt: 'Video 1' },
    { key: 'v2', src: v2, alt: 'Video 2' },
    { key: 'v3', src: v3, alt: 'Video 3' },
    { key: 'v4', src: v4, alt: 'Video 4' }
  ];

  const renderVideoItem = (video, className = '') => (
    <div 
      key={video.key}
      className={`video-item-hover ${className}`}
      onMouseEnter={() => handleMouseEnter(video.key)}
      onMouseLeave={() => handleMouseLeave(video.key)}
    >
      <div className="video-container">
        <video
          ref={videoRefs[video.key]}
          src={video.src}
          muted={videoStates[video.key].isMuted}
          loop
          playsInline
          className="hover-video"
        />
        
        <div className="video-controls">
          <button
            className="control-btn play-pause-btn"
            onClick={(e) => togglePlayPause(video.key, e)}
            aria-label={videoStates[video.key].isPlaying ? 'Pause' : 'Play'}
          >
            {videoStates[video.key].isPlaying ? '⏸' : '▶'}
          </button>
          
          <button
            className="control-btn mute-btn"
            onClick={(e) => toggleMute(video.key, e)}
            aria-label={videoStates[video.key].isMuted ? 'Unmute' : 'Mute'}
          >
            {videoStates[video.key].isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="videos-section">
      <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Videos
          </h2>
        </div>
      <div className="videos-four-grid">
        {videos.map(video => renderVideoItem(video, 'video-item'))}
      </div>
    </div>
  );
};

export default Videos;
