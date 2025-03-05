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
            <p className="font-bold mb-1">COMPUTER SCIENCE, B.Tech</p>
            <p>Kalinga Institute of Industrial Technology </p>
            <p>2022 - 2026</p>
            <p className="mt-1 text-[8px]">• CGPA: 7.5</p>
            <p className="text-[8px]">• Concentrations : Game Development, C++  </p>
          </div>
          <div className="mb-4">
            <p className="font-bold mb-1">RELATED COURSEWORK</p>
            <p className="text-[8px]">
              • Data Structures & Algorithms
            </p>
            <p className="text-[8px]">
              • Operating Systems
            </p>
            <p className="text-[8px]">
              • Database Management Systems
            </p>
            <p className="text-[8px]">
              • Artificial Intelligence
            </p>
            <p className="text-[8px]">
              • Object-Oriented Programming
            </p>
            <p className="text-[8px]">
              • Software Engineering
            </p>
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
