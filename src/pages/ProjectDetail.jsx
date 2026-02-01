import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ScrollToTop from '../Components/ScrollToTop';
import { getProjectBySlug } from '../data/projects';
import { useIsMobile } from '../hooks/useWindowSize';

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const project = getProjectBySlug(slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If project not found, redirect to projects page
  useEffect(() => {
    if (!project) {
      navigate('/projects', { replace: true });
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const animationDuration = isMobile ? 0.5 : 0.8;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <Navbar />

      <main className="container mx-auto px-4 md:px-6 py-16 sm:py-20 md:py-24 lg:py-32">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/projects"
            className="inline-flex items-center space-x-2 text-accent-blue hover:text-accent-blue-light transition-colors mb-6 sm:mb-8 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration }}
          className="mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          {/* Project Image */}
          <div className="relative rounded-xl overflow-hidden mb-6 sm:mb-8">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Title and Description */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl">
            {project.longDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm bg-white/10 rounded-full text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              <span>Live Demo</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-10 md:space-y-12">
            {/* Problem Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-red-500/20 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                The Problem
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-11 sm:pl-13">
                {project.problem}
              </p>
            </motion.section>

            {/* Solution Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/20 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
                The Solution
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed pl-11 sm:pl-13">
                {project.solution}
              </p>
            </motion.section>

            {/* Key Features */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
                Key Features
              </h2>
              <ul className="space-y-2 sm:space-y-3 pl-11 sm:pl-13">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm sm:text-base text-gray-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-accent-blue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Challenges & Learnings */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: animationDuration }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Challenges & Learnings
              </h2>
              <ul className="space-y-2 sm:space-y-3 pl-11 sm:pl-13">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm sm:text-base text-gray-400">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs sm:text-sm text-purple-400 font-medium">
                      {index + 1}
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Sidebar - Tech Stack */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: animationDuration }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Tech Stack
              </h3>
              <div className="space-y-4 sm:space-y-5">
                {project.techStack.map((tech, index) => (
                  <div key={index} className="border-b border-gray-700/50 pb-4 last:border-0 last:pb-0">
                    <h4 className="text-white font-medium text-sm sm:text-base mb-1">
                      {tech.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {tech.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 text-center py-8 sm:py-10 md:py-12 bg-white/5 backdrop-blur-sm rounded-xl"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Interested in working together?
          </h3>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 max-w-lg mx-auto px-4">
            I&apos;m always open to discussing new projects and opportunities.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base"
          >
            <span>Get in Touch</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
