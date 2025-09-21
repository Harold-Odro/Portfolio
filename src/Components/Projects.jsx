import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import { useLocation } from 'react-router-dom';

const Projects = () => {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Current time and user info
  const currentTime = "2025-03-26 10:22:21";
  const currentUser = "Harold-Odro";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Categorized projects
  const projectsByCategory = {
    'web-projects': [
      {
        title: "Portfolio Website",
        description: "Personal portfolio website with modern animations and effects",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        image: "/images/portfolio.png",
        link: "https://github.com/Harold-Odro/portfolio",
        category: "Web Development"
      },
      {
        title: "Movie Tracker Website",
        description: "Website that displays movie information using the TMDB API",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        image: "/images/movietracker.png",
        link: "https://movietracker.fly.dev",
        category: "Web Development"
      }
    ],
    'data-projects': [
      {
        title: "Data Analytics Dashboards",
        description: "Interactive dashboard for visualizing complex datasets with real-time updates",
        tags: ["React", "D3.js", "Python", "FastAPI"],
        image: "/images/dashboard.jpg",
        link: "https://public.tableau.com/app/profile/harold.odro/vizzes",
        category: "Data Analysis"
      }
    ],
  };

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

  // Function to render project section
  const renderProjectSection = (sectionId, projects) => (
    <div id={sectionId} className="mb-12 md:mb-20">
      {/* Status Bar - Only show on mobile */}


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.5 : 0.8 }}
        viewport={{ once: true }}
        className="mb-6 md:mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">
          {projects[0]?.category}
        </h2>
        <div className="h-1 w-16 md:w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </motion.div>

<div className="grid grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
  {projects.map((project, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: isMobile ? 0.5 : 0.8,
        delay: isMobile ? index * 0.1 : index * 0.2
      }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm">
        {/* Project Image - Reduced height */}
        <div className="relative h-40 md:h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Project Content - Reduced padding and spacing */}
        <div className="relative p-3 md:p-4">
          <h3 className="text-base md:text-lg font-bold text-white mb-1 md:mb-2">
            {project.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-300 mb-3">
            {project.description}
          </p>

          {/* Tags - Reduced size */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-0.5 text-xs bg-white/10 rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Project Link - Reduced size */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-1.5 text-accent-blue hover:text-accent-blue-light transition-colors duration-300"
          >
            <span className="text-xs md:text-sm">View Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 md:h-4 md:w-4 transform group-hover:translate-x-1 transition-transform"
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
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
      </div>
    </motion.div>
  ))}
</div>
    </div>
  );

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-12 md:py-20">
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
            className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            encryptedClassName="text-accent-blue"
            parentClassName="block mb-3 md:mb-4"
          />
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </motion.div>

        {/* Render each project section */}
        {Object.entries(projectsByCategory).map(([sectionId, projects]) =>
          projects.length > 0 && renderProjectSection(sectionId, projects)
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
          className="mt-12 md:mt-16 text-center"
        >
          <a
            href="https://github.com/Harold-Odro"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 overflow-hidden inline-flex items-center space-x-2 text-sm md:text-base"
          >
            <span className="relative z-10">View All Projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 transform group-hover:translate-x-1 transition-transform"
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;