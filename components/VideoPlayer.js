import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/VideoPlayer.module.css';

const VideoPlayer = ({ src, poster, title }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  // Format time in mm:ss format
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle play/pause
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // Handle fullscreen toggle
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'KeyF':
          handleFullscreen();
          break;
        case 'KeyM':
          setVolume(volume === 0 ? 1 : 0);
          if (videoRef.current) {
            videoRef.current.volume = volume === 0 ? 1 : 0;
          }
          break;
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
              videoRef.current.currentTime + 5,
              duration
            );
          }
          break;
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
              videoRef.current.currentTime - 5,
              0
            );
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, volume, duration]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        className={styles.video}
      />

      <div className={`${styles.controls} ${showControls ? styles.visible : ''}`}>
        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className={styles.progressBar}
            title="Seek"
          />
        </div>

        {/* Control Buttons */}
        <div className={styles.controlButtons}>
          <div className={styles.leftControls}>
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className={styles.button}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Volume Control */}
            <div className={styles.volumeControl}>
              <button
                className={styles.button}
                onClick={() => {
                  const newVolume = volume === 0 ? 1 : 0;
                  setVolume(newVolume);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                  }
                }}
                title="Mute (M)"
                aria-label="Toggle mute"
              >
                {volume === 0 ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M16.6915026,16.4744748 L3.50612381,3.28983778 C3.19218622,2.97590019 2.65151425,2.97590019 2.33757665,3.28983778 C2.02363906,3.60377534 2.02363906,4.14444731 2.33757665,4.45838491 L5.03378827,7.15459653 C5.03378827,7.15459653 2.30529175,10.1772221 2.30529175,15.0151496 C2.30529175,20.0151496 6.42908108,24.1389289 11.4290811,24.1389289 C15.8563168,24.1389289 19.5621127,21.4505414 20.8015886,17.5968298 L23.4871405,20.2823818 C23.8010781,20.5963194 24.3417501,20.5963194 24.6556876,20.2823818 C24.9696252,19.9684442 24.9696252,19.4277722 24.6556876,19.1138346 L16.6915026,16.4744748 Z M11.4290811,4.06697127 C12.3183154,4.06697127 13.1957504,4.16926786 14.0452356,4.35681625 L11.4290811,6.97297078 C11.4290811,6.97297078 10.1896051,6.97297078 10.1896051,6.97297078 C8.70987675,6.97297078 7.5,8.18284752 7.5,9.66257588 L7.5,11.5968208 C7.5,11.5968208 2.89529175,6.99210956 2.89529175,6.99210956 C3.45057987,5.18572375 5.61315225,4.06697127 11.4290811,4.06697127 Z M11.4290811,4.06697127" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.26 2.5-4.02zM14 3.1v2.7c2.89.86 5 3.54 5 6.8s-2.11 5.94-5 6.8v2.7c4.01-.91 7-4.49 7-9.5s-2.99-8.59-7-9.5z" />
                  </svg>
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
                title="Volume"
              />
            </div>

            {/* Time Display */}
            <div className={styles.timeDisplay}>
              <span>{formatTime(currentTime)}</span>
              <span> / </span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className={styles.rightControls}>
            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className={styles.button}
              title="Fullscreen (F)"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Title Overlay */}
      {title && <div className={styles.title}>{title}</div>}

      {/* Keyboard Shortcuts Hint */}
      <div className={styles.shortcutsHint}>
        <p>Space: Play/Pause | F: Fullscreen | M: Mute | ←/→: Skip 5s</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
