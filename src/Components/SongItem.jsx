import React, { useEffect, useState } from 'react';

const SongItem = ({id, cover, title, artist,url,onClick, isSelected }) => {
    const [duration,setDuration] = useState('00:00')

    useEffect(() => {
        const audio = new Audio(url);
    
        audio.addEventListener('loadedmetadata', () => {
          const songDuration = audio.duration;
          const minutes = Math.floor(songDuration / 60);
          const seconds = Math.floor(songDuration % 60);
          setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        });
    
        return () => {
          audio.removeEventListener('loadedmetadata', () => {});
        };
      }, [url]);
  return (
    <div className={`flex justify-between items-center p-2 hover:bg-[rgba(255,255,255,0.2)] rounded-md cursor-pointer ${isSelected ? 'bg-[rgba(255,255,255,0.2)]' : 'bg-transparent'}`}  onClick={onClick}>
      <div className="flex items-center">
        <img 
          src={cover} 
          alt={title} 
          className="w-12 h-12 rounded-full mr-4" 
        />
        <div>
          <div className="text-white font-medium">{title}</div>
          <div className="text-gray-400 text-sm">{artist}</div>
        </div>
      </div>
      <div className="text-gray-400">{duration}</div>
    </div>
  );
};

export default SongItem;
