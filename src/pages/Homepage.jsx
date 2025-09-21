import React, { useState } from 'react';
import LoadingPage from '../Components/LoadingPage';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import AboutSection from '../Components/AboutSection';
import Projects from '../Components/Projects';
import Footer from '../Components/Footer';
import { AnimatePresence, motion } from 'framer-motion';

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

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
          <main>
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