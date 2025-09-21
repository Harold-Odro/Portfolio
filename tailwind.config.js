/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#4070f4',
        'accent-blue-light': '#3560e0',
      },
      boxShadow: {
        'glow': '0 10px 25px -3px rgba(64, 112, 244, 0.3), 0 4px 6px -2px rgba(64, 112, 244, 0.1)',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'SF Mono', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}