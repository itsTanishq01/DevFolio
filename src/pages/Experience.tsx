import React, { useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

const experiences = [
  {
    title: "INTERN",
    company: "INDIAN OIL CORPORATION",
    location: "Bhubaneshwar, India",
    period: "Jan 2024 – Feb 2024",
    description: [
      "Engineered Python automation scripts to streamline and accelerate report generation processes.",
      "Automated manual report creation, eliminating human error.",
      "Significantly increased operational efficiency."
    ]
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
          
          <ul className="mt-4 text-[8px] list-disc pl-5">
            {currentExperience.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
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
