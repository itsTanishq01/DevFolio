import React, { useEffect } from 'react';
import RetroConsole from '../components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

// Sample data - replace with your actual leadership activities
const leadershipActivities = [
  {
    title: "Game Developer Team Lead",
    organization: "GeeksForGeeks KIIT",
    period: "July 2024 – Present",
    location: "Bhubaneshwar, India",
    description: [
      "Introduced Game Development Domain in the Society.",
      "Lead A First-Person Shooter Project, A Detective Story Game and many small projects in Raylib."
    ]
  },
  {
    title: "Core Developer",
    organization: "GeeksForGeeks KIIT",
    period: "June 2022 – April 2024",
    location: "Bhubaneshwar, India",
    description: [
      "Technologies Used: Java, C++, C, Python.",
      "Developed A scripting tool to scrape hackathons and upcoming internships."
    ]
  },
  {
    title: "Systems Developer",
    organization: "Google Developer Group",
    period: "Mar 2024 – Present",
    location: "Bhubaneshwar, India",
    description: [
      "Part of systems developer Team. Contributed in making Compilers."
    ]
  },
  {
    title: "Embedded Systems Developer",
    organization: "KIIT Robotics Society",
    period: "Nov 2023 – Mar 2024",
    location: "Bhubaneshwar, India",
    description: [
      "Part of the Embedded Team. Working With Robots, Embedded Systems Programming, Microprocessors.",
      "Made A Working airplane model representing KIIT at IIT-Kharagpur."
    ]
  }
];

const ActivitiesLeadership = () => {
  const { currentSubItemIndex, setMaxSubItems } = useNavigation();

  useEffect(() => {
    setMaxSubItems(leadershipActivities.length);
  }, []);
  
  const currentActivity = leadershipActivities[currentSubItemIndex];
  
  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xs font-bold text-retro-border tracking-wider">
            ACTIVITIES & LEADERSHIP {currentSubItemIndex + 1}/{leadershipActivities.length}
          </h1>
        </div>
        
        <div className="text-[10px] leading-normal space-y-3 text-retro-border">
          <p className="font-bold">{currentActivity.title}</p>
          <p>{currentActivity.organization} | {currentActivity.period}</p>
          <p>{currentActivity.location}</p>
          
          <ul className="mt-4 text-[8px] list-disc pl-5 gap-y-2">
            {currentActivity.description.map((item, index) => (
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

export default ActivitiesLeadership;