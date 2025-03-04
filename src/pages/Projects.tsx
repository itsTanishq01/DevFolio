
import React, { useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

const projects = [
  {
    title: "E-COMMERCE PLATFORM",
    tech: "REACT, NODE.JS, MONGODB",
    description: "Full-stack online store with secure payment processing and inventory management system."
  },
  {
    title: "SOCIAL MEDIA DASHBOARD",
    tech: "REACT, REDUX, FIREBASE",
    description: "Real-time analytics dashboard for monitoring social media engagement and performance metrics."
  },
  {
    title: "TASK MANAGEMENT APP",
    tech: "TYPESCRIPT, REACT, EXPRESS",
    description: "Collaborative project management tool with drag-and-drop interface and automated notifications."
  }
];

const Projects = () => {
  const { currentSubItemIndex, setMaxSubItems } = useNavigation();
  
  useEffect(() => {
    setMaxSubItems(projects.length);
  }, []);
  
  const currentProject = projects[currentSubItemIndex];
  
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xs font-bold text-retro-border tracking-wider">
            PROJECTS {currentSubItemIndex + 1}/{projects.length}
          </h1>
        </div>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <p className="font-bold">{currentProject.title}</p>
          <p>{currentProject.tech}</p>
          <p className="mt-4">{currentProject.description}</p>
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

export default Projects;
