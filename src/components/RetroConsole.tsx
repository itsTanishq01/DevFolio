import React, { ReactNode } from 'react';
import RetroControls from './RetroControls';
import RetroScreen from './RetroScreen';

interface RetroConsoleProps {
  children: ReactNode;
}

const RetroConsole: React.FC<RetroConsoleProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      {/* Console body - increased max-width for larger size */}
      <div className="relative bg-retro-body rounded-3xl overflow-hidden w-full max-w-[420px] shadow-2xl border-2 border-gray-300 transition-all animate-fade-in">
        {/* Top curved corners */}
        <div className="absolute top-0 left-0 w-8 h-8 bg-retro-body rounded-br-xl"></div>
        <div className="absolute top-0 right-0 w-8 h-8 bg-retro-body rounded-bl-xl"></div>
        
        {/* Screen section - increased padding for better proportions */}
        <div className="pt-8 px-6 pb-4">
          <RetroScreen>
            {children}
          </RetroScreen>
        </div>
        
        {/* Controls section - increased padding for better spacing */}
        <RetroControls />
        
        {/* Footer instructions */}
        <div className="py-4 text-center text-[10px] leading-tight bg-retro-body">
          <p className="mb-1">Use keyboard arrows or D-pad to move</p>
          <p>Press Enter or A button to select</p>
        </div>
      </div>
    </div>
  );
};

export default RetroConsole;
