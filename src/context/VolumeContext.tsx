
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface VolumeContextType {
  volume: number;
  increaseVolume: () => void;
  decreaseVolume: () => void;
  setVolume: (volume: number) => void;
}

const VolumeContext = createContext<VolumeContextType | undefined>(undefined);

export const useVolume = () => {
  const context = useContext(VolumeContext);
  if (context === undefined) {
    throw new Error('useVolume must be used within a VolumeProvider');
  }
  return context;
};

interface VolumeProviderProps {
  children: ReactNode;
}

export const VolumeProvider: React.FC<VolumeProviderProps> = ({ children }) => {
  const [volume, setVolume] = useState(() => {
    // Load saved volume from localStorage or default to 0.5
    const savedVolume = localStorage.getItem('retroPortfolioVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });

  // Save volume to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('retroPortfolioVolume', volume.toString());
  }, [volume]);

  const increaseVolume = () => {
    setVolume(prev => Math.min(1, prev + 0.1));
  };

  const decreaseVolume = () => {
    setVolume(prev => Math.max(0, prev - 0.1));
  };

  return (
    <VolumeContext.Provider value={{ volume, increaseVolume, decreaseVolume, setVolume }}>
      {children}
    </VolumeContext.Provider>
  );
};
