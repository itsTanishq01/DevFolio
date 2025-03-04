import React, { useState, useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';

const Index = () => {
  const [showCursor, setShowCursor] = useState(true);
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    
    // Delay showing the "Press START" text
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1200);
    
    return () => {
      clearInterval(cursorInterval);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <RetroConsole>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-xl font-bold text-retro-border mb-20 mt-10 tracking-wider animate-pixel-in">
          Tanishq Nimje
        </h1>
        
        {showText && (
          <div className="text-retro-border text-base mt-10 tracking-wider animate-fade-in">
            Press Enter{showCursor ? '_' : ' '}
          </div>
        )}
      </div>
    </RetroConsole>
  );
};

export default Index;
