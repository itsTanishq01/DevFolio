import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { playSound } from '../utils/audioUtils';

interface NavigationContextType {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  menuItems: MenuItem[];
  navigate: (to: string) => void;
  goBack: () => void;
  hasSubItems: boolean;
  currentSubItemIndex: number;
  setCurrentSubItemIndex: (index: number) => void;
  maxSubItems: number;
  setMaxSubItems: (count: number) => void;
}

interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}

// Define main menu items
const mainMenuItems: MenuItem[] = [
  { label: 'ABOUT', path: '/about', icon: '👤' },
  { label: 'EDUCATION', path: '/education', icon: '🎓' },
  { label: 'EXPERIENCE', path: '/experience', icon: '💼' },
  { id: 9, label: 'ACTIVITIES & LEADERSHIP', path: '/activities-leadership', icon: '🏆' },
  { label: 'PROJECTS', path: '/projects', icon: '🚀' },
  { label: 'SKILLS', path: '/skills', icon: '🛠️' },
  { label: 'RESUME', path: '/resume', icon: '📄' },
  { label: 'CONTACT', path: '/contact', icon: '📱' },
  { label: 'SETTINGS', path: '/settings', icon: '⚙️' },
];

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentSubItemIndex, setCurrentSubItemIndex] = useState(0);
  const [maxSubItems, setMaxSubItems] = useState(1);
  const [hasSubItems, setHasSubItems] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyNavigation = (e: KeyboardEvent) => {
    const isInSubItem = location.pathname !== '/' && location.pathname !== '/menu';

    // Only process navigation for the following keys
    const isNavigationKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
                            'w', 'a', 's', 'd', 'Enter', 'Escape'].includes(e.key);

    if (!isNavigationKey) return;

    // Prevent default behavior for navigation keys
    e.preventDefault();

    // Handle Escape key for all pages
    if (e.key === 'Escape') {
      playSound('back');
      if (location.pathname === '/menu') {
        navigate('/');
      } else if (location.pathname !== '/') {
        navigate('/menu');
      }
      return;
    }

    // Navigation within sub-items (like experience slides)
    if (isInSubItem && hasSubItems) {
      if (e.key === 'ArrowRight' || e.key === 'd') {
        playSound('move');
        setCurrentSubItemIndex(prev => Math.min(maxSubItems - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        playSound('move');
        setCurrentSubItemIndex(prev => Math.max(0, prev - 1));
      }
      return;
    }

    // Navigation in the main menu - with cyclical behavior
    if (location.pathname === '/menu') {
      if (e.key === 'ArrowUp' || e.key === 'w') {
        playSound('move');
        setSelectedIndex(prev => {
          const newIndex = prev === 0 ? mainMenuItems.length - 1 : prev - 1;
          // Scroll to the selected menu item after a short delay to ensure the DOM is updated
          setTimeout(() => {
            const selectedElement = document.querySelector(`[data-menu-index="${newIndex}"]`);
            if (selectedElement) {
              selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 10);
          return newIndex;
        });
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        playSound('move');
        setSelectedIndex(prev => {
          const newIndex = prev === mainMenuItems.length - 1 ? 0 : prev + 1;
          // Scroll to the selected menu item after a short delay to ensure the DOM is updated
          setTimeout(() => {
            const selectedElement = document.querySelector(`[data-menu-index="${newIndex}"]`);
            if (selectedElement) {
              selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 10);
          return newIndex;
        });
      } else if (e.key === 'Enter') {
        playSound('select');
        navigate(mainMenuItems[selectedIndex].path);
      }
    }

    // Navigation on the start screen
    if (location.pathname === '/') {
      if (e.key === 'Enter') {
        playSound('select');
        navigate('/menu');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyNavigation);
    return () => {
      window.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [selectedIndex, location.pathname, hasSubItems, currentSubItemIndex, maxSubItems]);

  useEffect(() => {
    // Reset sub-item index when location changes
    setCurrentSubItemIndex(0);

    // Set has sub-items based on the location
    setHasSubItems(['/experience', '/projects', '/activities-leadership'].includes(location.pathname));
  }, [location.pathname]);

  const contextValue: NavigationContextType = {
    selectedIndex,
    setSelectedIndex,
    menuItems: mainMenuItems,
    navigate: (to: string) => navigate(to),
    goBack: () => {
      playSound('back');
      if (location.pathname === '/menu') {
        navigate('/');
      } else {
        navigate('/menu');
      }
    },
    hasSubItems,
    currentSubItemIndex,
    setCurrentSubItemIndex,
    maxSubItems,
    setMaxSubItems
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};