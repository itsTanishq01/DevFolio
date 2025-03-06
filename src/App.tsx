
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationProvider } from "./context/NavigationContext";
import { VolumeProvider } from "./context/VolumeContext";
import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Resume from './pages/Resume';
import Settings from './pages/Settings';
import ActivitiesLeadership from './pages/ActivitiesLeadership';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Pre-load any assets or resources here
  useEffect(() => {
    // Preload images
    const imagesToPreload = [
      '/assets/TanishqNimje_Resume.pdf', // Resume file
      '/icon2.png', // Favicon
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    // Simulate minimum loading time for effect (at least 3 seconds)
    const minLoadingTime = 3500; // 3.5 seconds
    setTimeout(() => {
      // The actual completion is handled by the LoadingScreen component
      // This just ensures a minimum display time for the loading animation
    }, minLoadingTime);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading ? (
          <LoadingScreen onLoadComplete={() => setIsLoading(false)} />
        ) : (
          <BrowserRouter>
            <VolumeProvider>
              <NavigationProvider>
                <div className="animate-fade-in">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/education" element={<Education />} />
                    <Route path="/experience" element={<Experience />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/activities-leadership" element={<ActivitiesLeadership />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </NavigationProvider>
            </VolumeProvider>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;