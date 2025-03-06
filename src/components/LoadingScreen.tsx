import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audioUtils';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showPressEnter, setShowPressEnter] = useState(false);
  const [loadingText, setLoadingText] = useState("LOADING SYSTEM...");

  // Loading progress simulation
  useEffect(() => {
    if (progress >= 100) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        // Slow down progress as it approaches 100%
        const increment = Math.max(1, 5 * (1 - prev / 100));
        const newProgress = Math.min(100, prev + increment);

        if (newProgress === 100) {
          setLoadingComplete(true);
          setTimeout(() => {
            setLoadingText("SYSTEM READY");
            setShowPressEnter(true);
            try {
              playSound('success');
            } catch (e) {
              console.log('Sound not available');
            }
          }, 500);
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [progress]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      // Enter key when loading is complete
      if (e.key === 'Enter' && loadingComplete && showPressEnter) {
        setShowPressEnter(false);
        try {
          playSound('select');
        } catch (e) {
          console.log('Sound not available');
        }
        onLoadComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadingComplete, showPressEnter, onLoadComplete]);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[#001800] opacity-70 z-0"></div>

      {/* Retro scanlines */}
      <div className="absolute inset-0 bg-scanline z-10"></div>

      {/* Gameboy-inspired frame */}
      <div className="relative z-30 w-full max-w-[350px] p-4 rounded-lg border-8 border-[#8bac0f] bg-[#0f380f] shadow-[0_0_30px_rgba(139,172,15,0.3)]">
        <div className="mb-4 text-center bg-[#306230] py-2 rounded border-2 border-[#8bac0f]">
          <h2 className="text-xl font-pixel text-[#e0f8d0]">TANISHQ OS v1.0.4</h2>
          <div className="inline-block px-2 border border-[#8bac0f] bg-[#0f380f] rounded text-[#9bbc0f]">
            <span className="text-sm font-pixel tracking-wider">{loadingText}</span>
          </div>
        </div>

        {/* Loading screen content */}
        <div className="bg-[#0f380f] border-4 border-[#9bbc0f] rounded overflow-hidden p-6 mb-4 flex flex-col items-center justify-center">
          {/* Logo or icon placeholder */}
          <div className="w-24 h-24 mb-6 animate-pulse">
            <img 
              src="/icon2.png" 
              alt="Tanishq OS Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Loading animation - dots */}
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className="w-3 h-3 rounded-full bg-[#e0f8d0]"
                style={{
                  animation: `bounce 1s infinite ${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading bar */}
        <div className="bg-[#306230] p-1 border border-[#8bac0f] rounded mb-4">
          <div 
            className="h-3 bg-gradient-to-r from-[#8bac0f] to-[#e0f8d0] relative overflow-hidden transition-all duration-300"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-pattern-diagonal opacity-20"></div>
          </div>
        </div>

        {/* System info and loading status */}
        <div className="flex justify-between items-center">
          <div className="text-sm font-pixel text-[#9bbc0f]">
            {progress < 100 ? `${Math.floor(progress)}%` : 'READY'}
          </div>
        </div>
        
        {/* Press ENTER notification - now centered below */}
        {showPressEnter && (
          <div className="flex justify-center mt-4">
            <div className="bg-[#306230] px-3 py-1 border border-[#8bac0f] rounded animate-pulse-light">
              <span className="text-sm font-pixel text-[#e0f8d0]">PRESS ENTER TO CONTINUE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;