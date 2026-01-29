import RotatingText from './RotatingText';
import DecryptedText from './DecryptedText';
import { motion } from 'framer-motion';
import { useIsMobile } from '../hooks/useWindowSize';
import PropTypes from 'prop-types';

export default function HeroSection() {
  const isMobile = useIsMobile();

  // Use semantic HTML for mailto instead of JavaScript
  const mailtoLink = (() => {
    const subject = encodeURIComponent("Portfolio Contact");
    const body = encodeURIComponent("Hello Harold,\n\n");
    return `mailto:harodro@gmail.com?subject=${subject}&body=${body}`;
  })();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 1.0 : 2.0, ease: "easeInOut" }}
      className="relative h-screen bg-gradient-to-b from-gray-900 to-black"
    >
      {/* Status Bar removed - no longer needed */}

      {/* Background image with improved overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/70 to-black"></div>
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: isMobile ? 1.0 : 1.5, ease: "easeOut" }}
          src="/images/hero-bg.jpg"
          alt="Web Development Workspace"
          className="w-full h-full object-cover object-center filter brightness-75"
        />
      </div>

      {/* Content with improved layout and animations */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col justify-center h-full text-white">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.2 }}
        >
          <motion.div
            className="mb-4 md:mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.4 }}
          >
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <DecryptedText
                text="Welcome To My "
                speed={isMobile ? 50 : 80}
                maxIterations={isMobile ? 10 : 20}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                encryptedClassName="text-accent-blue"
                parentClassName="block"
              />
              <br className="hidden md:block" />
              <DecryptedText
                text="Portfolio"
                speed={isMobile ? 60 : 90}
                maxIterations={isMobile ? 10 : 20}
                sequential={true}
                revealDirection="start"
                animateOn="view"
                className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                encryptedClassName="text-accent-blue"
                parentClassName="block"
              />
            </h1>
          </motion.div>

          <motion.div
            className="flex items-center text-sm sm:text-base md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-12 space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: isMobile ? 0.8 : 1.0, delay: isMobile ? 2.0 : 3.0 }}
          >
            <span className="text-gray-300">I am a</span>
            <RotatingText
              texts={['Web Developer', 'Data Analyst', 'Tech Enthusiast']}
              mainClassName="px-2 sm:px-2.5 md:px-3 py-1 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg w-32 sm:w-36 md:w-48 lg:w-60"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={isMobile ? 0.015 : 0.025}
              splitLevelClassName="overflow-hidden"
              transition={{
                type: "spring",
                damping: isMobile ? 20 : 25,
                stiffness: isMobile ? 300 : 400
              }}
              rotationInterval={isMobile ? 1500 : 2000}
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: isMobile ? 1.0 : 1.4 }}
          >
            <a
              href={mailtoLink}
              aria-label="Send email to Harold Odro"
              className="group relative px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 overflow-hidden w-full sm:w-auto inline-block"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span className="text-xs sm:text-sm md:text-base">Contact Me</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 md:h-24 lg:h-32 bg-gradient-to-t from-black to-transparent z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.8 : 1, delay: isMobile ? 1.2 : 1.6 }}
      />
    </motion.section>
  );
}

// HeroSection has no props, but we document it for consistency
HeroSection.propTypes = {};