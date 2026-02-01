import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import DecryptedText from './DecryptedText';
import { projectsData } from '../data/projects';
import { useIsMobile } from '../hooks/useWindowSize';

const Projects = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // Use projects from data file - limit to 2 featured projects per category
  const projectsByCategory = Object.fromEntries(
    Object.entries(projectsData).map(([key, projects]) => [key, projects.slice(0, 2)])
  );

  // Scroll to specific section when navigating from skills
  useEffect(() => {
    if (location.state?.section) {
      const element = document.getElementById(location.state.section);
      if (element) {
        element.scrollIntoView({
          behavior: isMobile ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    }
  }, [location.state, isMobile]);

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.5 : 0.8 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 text-center"
        >
          <DecryptedText
            text="Featured Projects"
            speed={isMobile ? 50 : 80}
            maxIterations={isMobile ? 10 : 20}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            encryptedClassName="text-accent-blue"
            parentClassName="block mb-3 md:mb-4"
          />
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-2 sm:px-4">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Render each project section */}
        {Object.entries(projectsByCategory).map(([sectionId, projects]) =>
          projects.length > 0 ? (
            <div key={sectionId} id={sectionId} className="mb-10 sm:mb-12 md:mb-16 lg:mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: isMobile ? 0.5 : 0.8 }}
                viewport={{ once: true }}
                className="mb-4 sm:mb-6 md:mb-8 lg:mb-10"
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  {projects[0]?.category}
                </h2>
                <div className="h-0.5 sm:h-1 w-12 sm:w-16 md:w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </motion.div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 lg:gap-6 max-w-2xl mx-auto">
                {projects.map((project) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: isMobile ? 0.5 : 0.8,
                      delay: isMobile ? 0.1 : 0.2
                    }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm cursor-pointer"
                    >
                      <div className="relative h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.description}`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                      <div className="relative p-2.5 sm:p-3 md:p-4">
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-1.5 md:mb-2">
                          {project.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs md:text-sm text-gray-300 mb-2 sm:mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs bg-white/10 rounded-full text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center space-x-1 sm:space-x-1.5 text-accent-blue group-hover:text-accent-blue-light transition-colors duration-300">
                          <span className="text-[11px] sm:text-xs md:text-sm">View Details</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null
        )}

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: isMobile ? 0.5 : 0.8,
            delay: isMobile ? 0.3 : 0.6
          }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 text-center"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center space-x-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base"
          >
            <span>View All Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;