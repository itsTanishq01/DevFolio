
import React from 'react';
import RetroConsole from '@/components/RetroConsole';

const Education = () => {
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          EDUCATION
        </h1>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <div className="mb-4">
            <p className="font-bold mb-1">COMPUTER SCIENCE, B.SC</p>
            <p>Stanford University</p>
            <p>2018 - 2022</p>
            <p className="mt-1 text-[8px]">• Graduated with honors</p>
            <p className="text-[8px]">• Focus on AI and Machine Learning</p>
          </div>
          
          <div className="mb-4">
            <p className="font-bold mb-1">WEB DEVELOPMENT BOOTCAMP</p>
            <p>Code Academy</p>
            <p>2017</p>
            <p className="mt-1 text-[8px]">• Full-stack development</p>
            <p className="text-[8px]">• Agile methodologies</p>
          </div>
          
          <div className="mb-4">
            <p className="font-bold mb-1">HIGH SCHOOL DIPLOMA</p>
            <p>Tech High School</p>
            <p>2014 - 2018</p>
            <p className="mt-1 text-[8px]">• Computer Science Club President</p>
          </div>
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          PRESS B TO RETURN TO MENU
        </div>
      </div>
    </RetroConsole>
  );
};

export default Education;