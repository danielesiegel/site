"use client";

import React from 'react';
import MediaPlayer from './MediaPlayer';

export default function MediaPlayerWrapper() {
  const handlePlay = () => {
    console.log("Play triggered");
    // You can add additional logic here.
  };

  const handlePause = () => {
    console.log("Pause triggered");
  };

  const handleStop = () => {
    console.log("Stop triggered");
  };

  const handleFastback = () => {
    console.log("Fastback triggered");
  };

  return (
    <MediaPlayer 
      src={null} 
      onPlay={handlePlay}
      onPause={handlePause}
      onStop={handleStop}
      onFastback={handleFastback}
    />
  );
}
