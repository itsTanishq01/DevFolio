import React, { useEffect } from 'react';
import RetroConsole from '@/components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

const projects = [
  {
    title: "PROGRAMMING LANGUAGE",
    tech: "C++",
    description: [
      "Designed and implemented a custom programming language in C++, including a parser and interpreter, with core features such as loops and arithmetic operations.",
      "Developed fundamental language features, including conditionals, loops, and arithmetic operations, enabling the execution of complex algorithms."
    ]
  },
  {
    title: "TEXT EDITOR",
    tech: "C++, ImGUI",
    description: [
      "Engineered a fully functional text editor using C++ and ImGUI, optimizing performance for smooth user experience.",
      "Implemented key features such as file management (save, open), search and replace functionalities, and enhanced compatibility with .txt, .ini, and additional file formats, streamlining the editing process."
    ]
  },
  {
    title: "FIRST PERSON SHOOTER (FPS) GAME",
    tech: "Unreal Engine, C++",
    description: [
      "Designed and engineered a sophisticated multiplayer FPS game using Unreal Engine and C++.",
      "Developed a custom multiplayer subsystem to ensure seamless game state synchronization and player interaction.",
      "Integrated Steam API for robust anti-cheat mechanisms and efficient multiplayer matchmaking.",
      "Optimized network performance to handle up to 100 concurrent players, enhancing the gameplay experience."
    ]
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
          
          <ul className="mt-4 text-[8px] list-disc pl-5 gap-y-2">
            {currentProject.description.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
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

export default Projects;
