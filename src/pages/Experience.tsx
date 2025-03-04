
import React, { useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

const experiences = [
  {
    title: "SENIOR DEVELOPER",
    company: "TECH INNOVATIONS INC.",
    period: "2021 - PRESENT",
    description: "Led development of scalable web applications using React, Node.js, and TypeScript."
  },
  {
    title: "FRONTEND DEVELOPER",
    company: "DIGITAL CREATIONS CO.",
    period: "2018 - 2021",
    description: "Built responsive interfaces and optimized performance for high-traffic web applications."
  },
  {
    title: "JUNIOR DEVELOPER",
    company: "WEBTECH SOLUTIONS",
    period: "2016 - 2018",
    description: "Developed and maintained client websites and e-commerce platforms using JavaScript and PHP."
  }
];

const Experience = () => {
  const { currentSubItemIndex, setMaxSubItems } = useNavigation();
  
  useEffect(() => {
    setMaxSubItems(experiences.length);
  }, []);
  
  const currentExperience = experiences[currentSubItemIndex];
  
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xs font-bold text-retro-border tracking-wider">
            EXPERIENCE {currentSubItemIndex + 1}/{experiences.length}
          </h1>
        </div>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <p className="font-bold">{currentExperience.title}</p>
          <p>{currentExperience.company}</p>
          <p>{currentExperience.period}</p>
          <p className="mt-4">{currentExperience.description}</p>
        </div>
        
        <div className="mt-auto flex justify-center items-center text-[8px] text-retro-border">
          <span className="mx-1">◀</span> 
          <span>ARROW KEYS TO NAVIGATE</span>
          <span className="mx-1">▶</span>
        </div>
      </div>
    </RetroConsole>
  );
};

export default Experience;
