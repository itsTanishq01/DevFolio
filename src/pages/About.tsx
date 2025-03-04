
import React from 'react';
import RetroConsole from '@/components/RetroConsole';

const About = () => {
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          ABOUT ME
        </h1>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <p>
            Hi! I'm a passionate developer with expertise in modern web technologies.
          </p>
          <p>
            I create scalable, user-friendly applications with clean code and intuitive interfaces.
          </p>
          <p>
            My background in both frontend and backend development allows me to build complete solutions from concept to deployment.
          </p>
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          PRESS B TO RETURN TO MENU
        </div>
      </div>
    </RetroConsole>
  );
};

export default About;
