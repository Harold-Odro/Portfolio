import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useWindowSize';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const isMobile = useIsMobile();
  const animationDuration = isMobile ? 0.5 : 0.8;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const showToast = useCallback((type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 5000);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // EmailJS configuration - these should be in environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        publicKey
      );

      showToast('success', 'Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      showToast('error', 'Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, showToast]);

  return (
    <section id="contact" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: animationDuration }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <div className="inline-block px-3 sm:px-3.5 md:px-4 py-1.5 sm:py-1.5 md:py-2 bg-blue-50 rounded-full mb-4">
            <h3 className="text-blue-600 text-xs sm:text-xs md:text-sm font-semibold tracking-wider">GET IN TOUCH</h3>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
            Let&apos;s Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Together
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: animationDuration, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border ${
                    errors.name ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                  } rounded-lg text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                  } rounded-lg text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border ${
                  errors.subject ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                } rounded-lg text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border ${
                  errors.message ? 'border-red-500' : 'border-gray-700 focus:border-blue-500'
                } rounded-lg text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none`}
                placeholder="Tell me about your project or idea..."
              />
              {errors.message && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting || isMobile ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || isMobile ? 1 : 0.98 }}
              className={`w-full px-6 py-3 sm:py-3.5 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Alternative Contact */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: animationDuration, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6"
          >
            Or email me directly at{' '}
            <a
              href="mailto:harodro@gmail.com"
              className="text-accent-blue hover:text-accent-blue-light transition-colors"
            >
              harodro@gmail.com
            </a>
          </motion.p>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className={`fixed bottom-4 sm:bottom-6 left-1/2 transform px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-lg z-50 flex items-center space-x-2 sm:space-x-3 max-w-[90vw] sm:max-w-md ${
              toast.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span className="text-sm sm:text-base">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
