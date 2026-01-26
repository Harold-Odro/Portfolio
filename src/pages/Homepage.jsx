import { useState, useCallback, useEffect } from 'react';
import LoadingPage from '../Components/LoadingPage';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import Projects from '../Components/Projects';
import Footer from '../Components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

export default function Homepage() {
  // Only show loading page once per session
  // Gracefully handles private browsing mode where sessionStorage throws
  const [isLoading, setIsLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('hasVisitedHomepage');
    } catch {
      // Private browsing or storage disabled - default to showing loading
      return true;
    }
  });

  useEffect(() => {
    // Mark as visited when loading completes
    if (!isLoading) {
      try {
        sessionStorage.setItem('hasVisitedHomepage', 'true');
      } catch (error) {
        // Silently fail in private browsing mode
        console.warn('sessionStorage not available:', error);
      }
    }
  }, [isLoading]);

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingPage key="loader" onLoadComplete={handleLoadComplete} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen bg-black"
        >
          <Navbar />
          <main id="main-content">
            <HeroSection />
            <AboutSection />
            <Projects />
            <Footer />
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
}