import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';
import DecryptedText from '../Components/DecryptedText';
import { allProjects } from '../data/projects';
import { useIsMobile } from '../hooks/useWindowSize';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const isMobile = useIsMobile();

  const categories = ['all', 'Web Development'];

  // Memoize filtered projects to avoid recalculation on every render
  const filteredProjects = useMemo(() => {
    return filter === 'all'
      ? allProjects
      : allProjects.filter(project => project.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center"
        >
          <DecryptedText
            text="All Projects"
            speed={isMobile ? 50 : 80}
            maxIterations={isMobile ? 10 : 20}
            sequential={true}
            revealDirection="start"
            animateOn="view"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            encryptedClassName="text-accent-blue"
            parentClassName="block mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          />
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2 sm:px-0">
            Explore my portfolio of web development projects
          </p>

          {/* Back to Home Link */}
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 sm:space-x-2 text-accent-blue hover:text-accent-blue-light transition-colors mt-4 sm:mt-6 text-xs sm:text-sm md:text-base"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12 lg:mb-16"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              aria-label={`Filter by ${category === 'all' ? 'all projects' : category}`}
              className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                filter === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: isMobile ? 0.5 : 0.8,
                delay: isMobile ? index * 0.1 : index * 0.15
              }}
              className="group relative"
            >
              <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm h-full flex flex-col cursor-pointer">
                {/* Project Image */}
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.description}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4">
                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full text-white">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="relative p-3 sm:p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1.5 sm:mb-2 md:mb-3">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-3 sm:mb-4 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-1.5 sm:px-2 md:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-white/10 rounded-full text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <span className="inline-flex items-center space-x-1.5 sm:space-x-2 text-accent-blue group-hover:text-accent-blue-light transition-colors duration-300 text-xs sm:text-sm md:text-base">
                    <span>View Project</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 sm:py-16 md:py-20"
          >
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">No projects found in this category.</p>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 text-center"
        >
          <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">Want to see more?</p>
          <a
            href="https://github.com/Harold-Odro"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 sm:space-x-2 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300 text-xs sm:text-sm md:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            <span className="relative z-10">Visit GitHub Profile</span>
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
          </a>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
