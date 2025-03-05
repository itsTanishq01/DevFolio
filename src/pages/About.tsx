
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
            Game Developer, Tech Enthusiast and F1 Addict.
          </p>
          <p>
            I create fun, user-friendly games with clean code and less lag.
          </p>
          <p>
            I mostly use C++ and Unreal but had fun with Unity and Raylib.
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
