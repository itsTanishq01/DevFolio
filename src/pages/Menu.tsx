import React from 'react';
import RetroConsole from '@/components/RetroConsole';
import { useNavigation } from '../context/NavigationContext';

const Menu = () => {
  const { menuItems, selectedIndex } = useNavigation();

  return (
    <RetroConsole>
      <div className="flex flex-col h-full">
        <h1 className="text-lg font-bold text-retro-border mb-4 text-center tracking-wider">
          PORTFOLIO
        </h1>
        
        <div className="flex flex-col space-y-3 overflow-y-auto scrollbar-hide pb-4" style={{ maxHeight: 'calc(100% - 60px)' }}>
          {menuItems.map((item, index) => (
            <div 
              key={item.path}
              data-menu-index={index}
              className={`
                text-sm py-2 px-5 transition-colors duration-150 
                ${selectedIndex === index 
                  ? 'bg-retro-border text-retro-screen' 
                  : 'text-retro-menuItem-default'}
              `}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </RetroConsole>
  );
};

export default Menu;  