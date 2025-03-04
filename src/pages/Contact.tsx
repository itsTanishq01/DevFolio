
import React from 'react';
import RetroConsole from '@/components/RetroConsole';

const Contact = () => {
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          CONTACT
        </h1>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <div className="mb-2">
            <p className="font-bold">EMAIL</p>
            <p>developer@example.com</p>
          </div>
          
          <div className="mb-2">
            <p className="font-bold">GITHUB</p>
            <p>github.com/devexample</p>
          </div>
          
          <div className="mb-2">
            <p className="font-bold">LINKEDIN</p>
            <p>linkedin.com/in/devexample</p>
          </div>
          
          <div className="mb-2">
            <p className="font-bold">LOCATION</p>
            <p>San Francisco, CA</p>
          </div>
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          PRESS B TO RETURN TO MENU
        </div>
      </div>
    </RetroConsole>
  );
};

export default Contact;
