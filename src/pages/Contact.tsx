
import React, { useState, useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { playSound } from '../utils/audioUtils';

const contactItems = [
  { label: 'EMAIL', value: 'tanishqnimje01@gmail.com', url: 'mailto:tanishqnimje01@gmail.com' },
  { label: 'GITHUB', value: 'github.com/itsTanishq01', url: 'https://github.com/itsTanishq01' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/tanishqnimje', url: 'https://linkedin.com/in/tanishqnimje' },
  { label: 'LOCATION', value: 'Bhubaneshwar, India', url: null }
];

const Contact = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'w') {
      playSound('move');
      setSelectedIndex(prev => (prev === 0 ? contactItems.length - 1 : prev - 1));
    } else if (e.key === 'ArrowDown' || e.key === 's') {
      playSound('move');
      setSelectedIndex(prev => (prev === contactItems.length - 1 ? 0 : prev + 1));
    } else if (e.key === 'Enter' && contactItems[selectedIndex].url) {
      playSound('select');
      window.open(contactItems[selectedIndex].url, '_blank');
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [selectedIndex]);
  
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          CONTACT
        </h1>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          {contactItems.map((item, index) => (
            <div 
              key={item.label} 
              className={`mb-2 p-1 ${selectedIndex === index ? 'bg-retro-border text-retro-screen' : ''} 
                          ${item.url ? 'cursor-pointer' : ''}`}
              onClick={() => {
                if (item.url) {
                  setSelectedIndex(index);
                  playSound('select');
                  window.open(item.url, '_blank');
                }
              }}
            >
              <p className="font-bold">{item.label}</p>
              <p className={item.url ? 'underline' : ''}>{item.value}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          {contactItems[selectedIndex].url 
            ? 'PRESS ENTER TO OPEN LINK' 
            : 'PRESS B TO RETURN TO MENU'}
        </div>
      </div>
    </RetroConsole>
  );
};

export default Contact;