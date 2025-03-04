
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigation } from '../context/NavigationContext';
import { playSound } from '../utils/audioUtils';

const RetroControls: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuItems, selectedIndex, setSelectedIndex, hasSubItems, currentSubItemIndex, setCurrentSubItemIndex, maxSubItems } = useNavigation();

  const handleDPadUp = () => {
    if (location.pathname === '/menu') {
      playSound('move');
      const newIndex = Math.max(0, selectedIndex - 1);
      setSelectedIndex(newIndex);
    }
  };

  const handleDPadDown = () => {
    if (location.pathname === '/menu') {
      playSound('move');
      const newIndex = Math.min(menuItems.length - 1, selectedIndex + 1);
      setSelectedIndex(newIndex);
    }
  };

  const handleDPadLeft = () => {
    if (hasSubItems) {
      playSound('move');
      const newIndex = Math.max(0, currentSubItemIndex - 1);
      setCurrentSubItemIndex(newIndex);
    }
  };

  const handleDPadRight = () => {
    if (hasSubItems) {
      playSound('move');
      const newIndex = Math.min(maxSubItems - 1, currentSubItemIndex + 1);
      setCurrentSubItemIndex(newIndex);
    }
  };

  const handleAButton = () => {
    playSound('select');
    if (location.pathname === '/') {
      navigate('/menu');
    } else if (location.pathname === '/menu') {
      navigate(menuItems[selectedIndex].path);
    }
  };

  const handleBButton = () => {
    playSound('back');
    if (location.pathname === '/menu') {
      navigate('/');
    } else if (location.pathname !== '/') {
      navigate('/menu');
    }
  };

  return (
    <div className="relative pt-8 pb-6 bg-retro-body flex flex-col items-center">
      {/* Top row: D-pad on left, action buttons on right - increased sizing */}
      <div className="w-full flex justify-between px-8 mb-6">
        {/* D-Pad container - increased size */}
        <div className="relative w-28 h-28">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 bg-retro-dpad rounded-t-md hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
            onClick={handleDPadUp}>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-gray-100"></div>
          </div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-retro-dpad rounded-l-md hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
            onClick={handleDPadLeft}>
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-gray-100"></div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-retro-dpad rounded-r-md hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
            onClick={handleDPadRight}>
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-gray-100"></div>
          </div>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-10 h-10 bg-retro-dpad rounded-b-md hover:opacity-80 active:opacity-60 transition-opacity cursor-pointer flex items-center justify-center"
            onClick={handleDPadDown}>
            <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-100"></div>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-retro-dpad rounded-sm"></div>
        </div>
        
        {/* Action Buttons container - kept original size but adjusted positioning */}
        <div className="flex items-start gap-4">
          <button
            onClick={handleBButton}
            className="w-12 h-12 rounded-full bg-retro-button text-white text-xs font-semibold hover:opacity-80 active:opacity-60 transition-opacity flex items-center justify-center"
          >
            B
          </button>
          <button
            onClick={handleAButton}
            className="w-12 h-12 rounded-full bg-retro-button text-white text-xs font-semibold hover:opacity-80 active:opacity-60 transition-opacity flex items-center justify-center mt-6"
          >
            A
          </button>
        </div>
      </div>
      
      {/* Bottom row: SELECT and START buttons - increased spacing */}
      <div className="flex gap-10 mt-2">
        <div className="bg-retro-button text-white text-[9px] px-5 py-1 rounded transform -rotate-6 shadow">
          SELECT
        </div>
        <div className="bg-retro-button text-white text-[9px] px-5 py-1 rounded transform -rotate-6 shadow">
          START
        </div>
      </div>
    </div>
  );
};

export default RetroControls;
