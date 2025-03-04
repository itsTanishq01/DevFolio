
import React, { ReactNode } from 'react';

interface RetroScreenProps {
  children: ReactNode;
}

const RetroScreen: React.FC<RetroScreenProps> = ({ children }) => {
  return (
    <div className="relative bg-retro-screen rounded-md border-5 border-retro-border">
      {/* Screen frame - slightly taller aspect ratio */}
      <div className="relative w-full aspect-[4/5] overflow-hidden retro-scanline">
        {/* Screen content - increased padding for better readability */}
        <div className="w-full h-full p-5 overflow-auto retro-shadow">
          {children}
        </div>
        
        {/* Scanline effect overlay (subtle) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/5 to-transparent opacity-30"></div>
      </div>
    </div>
  );
};

export default RetroScreen;
