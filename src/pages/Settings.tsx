
import React, { useState, useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { playSound } from '../utils/audioUtils';
import { useVolume } from '../context/VolumeContext';

const Settings = () => {
  const { volume, increaseVolume, decreaseVolume } = useVolume();
  const [selectedOption, setSelectedOption] = useState(0);
  
  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'd') {
      if (selectedOption === 0) {
        playSound('select');
        increaseVolume();
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
      if (selectedOption === 0) {
        playSound('select');
        decreaseVolume();
      }
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [selectedOption, volume]);
  
  const volumePercentage = Math.round(volume * 100);
  const volumeBars = Math.round(volume * 10);
  
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          SETTINGS
        </h1>
        
        <div className="text-[10px] leading-normal space-y-6 text-retro-border">
          <div className="bg-retro-border text-retro-screen p-1">
            <div className="flex justify-between items-center">
              <span>VOLUME</span>
              <div className="flex items-center gap-2">
                <span>{volumePercentage}%</span>
                <div className="flex items-center h-3">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 h-${Math.min(i + 1, 3)} mx-px ${i < volumeBars ? 'bg-retro-screen' : 'bg-retro-screen opacity-30'}`}
                      style={{ height: `${Math.min((i + 1) * 2, 6)}px` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-1">
            <div className="flex gap-4 items-center">
              <div className="flex-1 text-center">◀ DECREASE</div>
              <div className="flex-1 text-center">INCREASE ▶</div>
            </div>
          </div>
        </div>
      </div>
    </RetroConsole>
  );
};

export default Settings;
