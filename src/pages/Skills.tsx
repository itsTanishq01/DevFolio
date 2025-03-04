
import React from 'react';
import RetroConsole from '@/components/RetroConsole';

const Skills = () => {
  const skillGroups = [
    {
      category: "LANGUAGES",
      skills: ["JAVASCRIPT", "TYPESCRIPT", "HTML", "CSS", "PYTHON"]
    },
    {
      category: "FRAMEWORKS",
      skills: ["REACT", "ANGULAR", "VUE", "NODE.JS", "EXPRESS"]
    },
    {
      category: "TOOLS",
      skills: ["GIT", "DOCKER", "AWS", "WEBPACK", "JEST"]
    }
  ];

  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-xs font-bold text-retro-border mb-4 tracking-wider">
          SKILLS
        </h1>
        
        <div className="text-[10px] leading-normal space-y-4 text-retro-border">
          {skillGroups.map((group, index) => (
            <div key={index} className="mb-3">
              <h2 className="font-bold mb-1">{group.category}</h2>
              <div className="grid grid-cols-2 gap-1">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center">
                    <span className="text-[6px] mr-1">►</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto text-[8px] text-retro-border opacity-80">
          PRESS B TO RETURN TO MENU
        </div>
      </div>
    </RetroConsole>
  );
};

export default Skills;
