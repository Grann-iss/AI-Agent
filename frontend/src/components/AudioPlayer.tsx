import React, { useRef, useState } from 'react';
import { Play, Pause, Download } from 'lucide-react';

export const AudioPlayer: React.FC<{ url: string }> = ({ url }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded bg-white">
      <audio ref={audioRef} src={url} onEnded={() => setIsPlaying(false)} />
      <button onClick={togglePlay} className="p-1 rounded-full hover:bg-gray-100">
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <a href={url} download className="p-1 rounded-full hover:bg-gray-100">
        <Download size={20} />
      </a>
    </div>
  );
};
