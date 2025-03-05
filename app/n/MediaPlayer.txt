// frontend/components/MediaPlayer.tsx
import React from 'react';

interface MediaPlayerProps {
  src: string;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  onFastback: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ src, onPlay, onPause, onStop, onFastback }) => {
  return (
    <div>
      <h3>Media Controls</h3>
      <audio controls src={src} style={{ width: '100%' }} />
      <div style={{ marginTop: '0.5rem' }}>
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause} style={{ marginLeft: '0.5rem' }}>Pause</button>
        <button onClick={onStop} style={{ marginLeft: '0.5rem' }}>Stop</button>
        <button onClick={onFastback} style={{ marginLeft: '0.5rem' }}>Fast Back</button>
      </div>
      {/* TODO: Add a notification area with download options for mp4/mp3 */}
    </div>
  );
};

export default MediaPlayer;
