import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../hooks/useWindowSize';

export default function AboutSection() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const isMobile = useIsMobile();
  const animationDuration = isMobile ? 0.5 : 0.8;

  const skillCards = [
    {
      category: "Web Development",
      description: "Full-stack development with modern frameworks",
      technologies: ["React", "Laravel", "Node.js"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      projectSection: "web-projects"
    },
    {
      category: "Data Analysis",
      description: "Transforming data into actionable insights",
      technologies: ["Python", "SQL", "Tableau"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      projectSection: "data-projects"
    }
  ];

  const handleDownloadCV = async () => {
    try {
      setIsDownloading(true);
      setDownloadError(false);

      const cvUrl = '/files/Harold_Odro_CV.pdf';
      const response = await fetch(cvUrl);

      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'Harold-Odro-CV.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading CV:', error);
      setDownloadError(true);
      setTimeout(() => setDownloadError(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCardClick = (projectSection) => {
    navigate('/projects', {
      state: {
        section: projectSection,
        fromSkills: true
      }
    });
  };

  // Mobile scroll behavior
  useEffect(() => {
    if (isMobile) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [isMobile]);

  return (
    <section id="about" className="py-12 md:py-24 bg-gradient-to-b from-black to-gray-900">

      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: animationDuration }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Image Grid Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, delay: isMobile ? 0.1 : 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/about-img-1.jpg"
                    alt="Professional Development"
                    className="w-full h-48 md:h-72 object-cover rounded-2xl shadow-lg"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: isMobile ? 1 : 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/about-img-2.jpg"
                    alt="Data Analysis"
                    className="w-full h-48 md:h-72 object-cover rounded-2xl shadow-lg mt-0 sm:mt-6"
                  />
                </motion.div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 bg-blue-500/10 rounded-full -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-24 md:w-32 h-24 md:h-32 bg-purple-500/10 rounded-full -z-10"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration, delay: isMobile ? 0.2 : 0.4 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block px-3 md:px-4 py-1 md:py-2 bg-blue-50 rounded-full">
                <h3 className="text-blue-600 text-xs md:text-sm font-semibold tracking-wider">ABOUT ME</h3>
              </div>

              <h2 className="text-2xl md:text-4xl font-bold text-gray-400 leading-tight">
                Crafting Digital Excellence Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Code & Data
                </span>
              </h2>

              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                As a passionate developer and data analyst, I blend technical expertise with creative
                problem-solving to build exceptional digital experiences. My approach combines modern
                web development technologies with data-driven insights to create solutions that make
                a real impact.
              </p>

              {/* Skills Section with Cards */}
              <div className="grid grid-cols-1 gap-6 md:gap-8 mt-8 md:mt-12">
                {skillCards.map((card, index) => (
                  <motion.div
                    key={card.category}
                    className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-4 md:p-6 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * (isMobile ? 0.05 : 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: isMobile ? 1 : 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCardClick(card.projectSection)}
                  >
                    {/* Card content remains the same */}
                    <div className="relative z-10">
                      <motion.div
                        className="text-accent-blue mb-4"
                        whileHover={{ rotate: isMobile ? 0 : 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {card.icon}
                      </motion.div>

                      <motion.h3
                        className="text-lg md:text-xl font-semibold text-white mb-2"
                        whileHover={{ x: isMobile ? 0 : 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {card.category}
                      </motion.h3>

                      <p className="text-xs md:text-sm text-gray-400 mb-4">
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {card.technologies.map((tech) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-md bg-white/10 text-gray-300"
                            whileHover={{
                              scale: isMobile ? 1 : 1.05,
                              backgroundColor: "rgba(255, 255, 255, 0.2)"
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* View Projects Link */}
                      <motion.div
                        className="mt-4 flex items-center text-accent-blue text-xs md:text-sm font-medium group-hover:text-accent-blue-light transition-colors duration-300"
                        whileHover={{ x: isMobile ? 0 : 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>View Projects</span>
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 relative w-full sm:w-auto">
                <motion.button
                  onClick={handleDownloadCV}
                  disabled={isDownloading}
                  whileHover={{ scale: isDownloading || isMobile ? 1 : 1.05 }}
                  whileTap={{ scale: isDownloading || isMobile ? 1 : 0.95 }}
                  className={`
                    px-4 py-2 md:px-6 md:py-3
                    w-full sm:w-auto
                    bg-gradient-to-r from-blue-600 to-purple-600
                    text-white rounded-lg font-medium
                    shadow-lg shadow-blue-500/25
                    hover:shadow-xl
                    transition-all duration-300
                    flex items-center justify-center space-x-2
                    ${isDownloading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl'}
                  `}
                >
                  {isDownloading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 md:h-5 md:w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="text-sm md:text-base">Downloading...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 md:w-5 md:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="text-sm md:text-base">Download CV</span>
                    </>
                  )}
                </motion.button>
                {downloadError && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-8 text-red-500 text-xs md:text-sm"
                  >
                    Failed to download CV. Please try again.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
