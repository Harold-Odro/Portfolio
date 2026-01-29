import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useWindowSize';

const LoadingPage = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const isMobile = useIsMobile();

  // Update current date and time
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toISOString().replace('T', ' ').substring(0, 19);
      setCurrentDateTime(formatted);
    };

    // Update immediately and then every second
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer1, timer2;

    timer1 = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + Math.random() * 15, 100));
      } else {
        timer2 = setTimeout(() => {
          onLoadComplete();
        }, 1000);
      }
    }, 150);

    return () => {
      clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
    };
  }, [progress, onLoadComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeInOut" }}
    >
      <motion.div
        className="w-full max-w-2xl px-3 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >


        {/* Main Content */}
        <div className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16 space-y-3 sm:space-y-4 md:space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 md:mb-3">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                This is Harold Odro
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-light">
              Welcome to my portfolio
            </p>
          </motion.div>
        </div>

        {/* Loading Bar Container */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-2 sm:px-4 md:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Progress Bar */}
          <div className="relative h-0.5 sm:h-1 w-full bg-gray-800 rounded-full overflow-hidden mb-2 sm:mb-3 md:mb-4">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center">
            <motion.span
              className="text-gray-500 text-[10px] sm:text-xs md:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading experience
            </motion.span>
            <motion.span
              className="text-gray-400 font-medium text-[10px] sm:text-xs md:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-1 sm:space-x-1.5 md:space-x-2 mt-4 sm:mt-6 md:mt-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: isMobile ? 0.8 : 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-0 right-0 text-center px-3 sm:px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm font-mono">
            {currentDateTime}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

LoadingPage.propTypes = {
  onLoadComplete: PropTypes.func.isRequired,
};

export default LoadingPage;