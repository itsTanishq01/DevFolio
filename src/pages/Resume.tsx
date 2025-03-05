import React, { useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { playSound } from '../utils/audioUtils';

const Resume = () => {
  const handleDownload = () => {
    playSound('select');
    const resumeUrl = "/assets/TanishqNimje_Resume.pdf";
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = "TanishqNimje_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
    };
  }, []);

  return (
    <RetroConsole>
      <div className="flex flex-col h-full items-center justify-center">
        <h1 className="text-xs font-bold text-retro-border mb-6 tracking-wider">
          RESUME
        </h1>
        
        <div className="text-[10px] leading-normal space-y-6 text-retro-border text-center">
          <p>
            Download my resume to learn more about my skills, experience, and education.
          </p>
          
          <Button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-retro-border text-retro-screen hover:bg-retro-border/80"
          >
            <Download size={16} />
            Download Resume
          </Button>
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          PRESS ENTER TO DOWNLOAD OR B TO RETURN TO MENU
        </div>
      </div>
    </RetroConsole>
  );
};

export default Resume;
