import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingPage from '../Components/LoadingPage';
import HeroSection from '../Components/HeroSection';

const TransitionWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingPage key="loader" onLoadComplete={handleLoadComplete} />
        ) : (
          <HeroSection key="hero" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransitionWrapper;