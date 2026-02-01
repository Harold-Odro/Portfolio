export const projectsData = {
  'web-projects': [
    {
      slug: 'priselle',
      title: "Priselle",
      description: "Modern web application built with cutting-edge technologies",
      longDescription: "Priselle is a full-stack web application that showcases modern web development practices. Built with React and Node.js, it demonstrates proficiency in both frontend and backend development.",
      problem: "There was a need for a modern, responsive web application that could handle complex user interactions while maintaining excellent performance and user experience.",
      solution: "Developed a full-stack solution using React for the frontend with a clean, intuitive interface. The backend is powered by Node.js, providing a robust API layer. Deployed on Fly.io for reliable, scalable hosting.",
      challenges: [
        "Implementing responsive design that works seamlessly across all device sizes",
        "Optimizing performance for fast load times and smooth interactions",
        "Setting up a reliable deployment pipeline with Fly.io"
      ],
      techStack: [
        { name: "React", reason: "Chosen for its component-based architecture and efficient rendering" },
        { name: "Tailwind CSS", reason: "Enables rapid UI development with utility-first approach" },
        { name: "Node.js", reason: "Provides a scalable backend with JavaScript consistency" },
        { name: "Fly.io", reason: "Offers reliable global deployment with edge computing" }
      ],
      features: [
        "Modern, responsive user interface",
        "Fast page loads with optimized assets",
        "Secure backend API integration",
        "Mobile-first design approach"
      ],
      tags: ["React", "Tailwind CSS", "Full Stack"],
      image: "/images/priselle.jpeg",
      link: "https://priselle.fly.dev",
      github: "https://github.com/Harold-Odro",
      category: "Web Development"
    },
    {
      slug: 'good-nature-co',
      title: "Good Nature & Co",
      description: "E-commerce website with modern design and seamless user experience",
      longDescription: "Good Nature & Co is an e-commerce platform designed to showcase products with an emphasis on clean aesthetics and intuitive user experience. Built with Next.js for optimal performance and SEO.",
      problem: "Creating an e-commerce experience that balances beautiful design with functional shopping features, while ensuring fast load times and discoverability through search engines.",
      solution: "Leveraged Next.js for server-side rendering and static generation, ensuring excellent SEO and performance. Implemented a clean, modern design that puts products front and center while maintaining easy navigation.",
      challenges: [
        "Implementing server-side rendering for SEO optimization",
        "Creating a visually appealing product showcase",
        "Ensuring smooth transitions and interactions throughout the shopping experience"
      ],
      techStack: [
        { name: "Next.js", reason: "Provides SSR/SSG for SEO and performance benefits" },
        { name: "Vercel", reason: "Seamless deployment with Next.js integration" },
        { name: "Tailwind CSS", reason: "Rapid styling with consistent design system" },
        { name: "React", reason: "Component architecture for reusable UI elements" }
      ],
      features: [
        "Server-side rendered pages for SEO",
        "Beautiful product galleries",
        "Responsive design across all devices",
        "Fast page transitions"
      ],
      tags: ["Next.js", "Vercel", "E-commerce"],
      image: "/images/goodnature.jpeg",
      link: "https://good-natureand-co.vercel.app/",
      github: "https://github.com/Harold-Odro",
      category: "Web Development"
    },
    {
      slug: 'movie-tracker',
      title: "Movie Tracker",
      description: "Website that displays movie information using the TMDB API",
      longDescription: "Movie Tracker is a web application that allows users to discover and explore movies using real-time data from The Movie Database (TMDB) API. It features search functionality, movie details, and trending content.",
      problem: "Movie enthusiasts needed an easy way to discover new films, search for specific titles, and get detailed information about movies including ratings, cast, and descriptions.",
      solution: "Built a React application that integrates with the TMDB API to fetch real-time movie data. Implemented search functionality, movie details pages, and trending movies sections with a clean, user-friendly interface.",
      challenges: [
        "Handling asynchronous API calls efficiently",
        "Implementing effective search with debouncing",
        "Managing state for complex data structures",
        "Creating an intuitive navigation system"
      ],
      techStack: [
        { name: "React", reason: "Excellent for building interactive UIs with complex state" },
        { name: "TMDB API", reason: "Comprehensive movie database with extensive documentation" },
        { name: "Tailwind CSS", reason: "Quick styling for movie cards and layouts" },
        { name: "Fly.io", reason: "Reliable deployment with good free tier" }
      ],
      features: [
        "Real-time movie search",
        "Trending movies section",
        "Detailed movie information",
        "Responsive movie card grid",
        "Genre-based filtering"
      ],
      tags: ["React", "Tailwind CSS", "API Integration"],
      image: "/images/movietracker.png",
      link: "https://movietracker.fly.dev",
      github: "https://github.com/Harold-Odro",
      category: "Web Development"
    },
    {
      slug: 'accra-rentals',
      title: "Accra Rentals",
      description: "Property rental platform for finding apartments and homes in Accra",
      longDescription: "Accra Rentals is a property listing platform designed to help people find rental properties in Accra, Ghana. It features property listings, search filters, and detailed property information.",
      problem: "Finding rental properties in Accra can be challenging due to scattered listings across multiple platforms and lack of detailed information. There was a need for a centralized, user-friendly platform.",
      solution: "Created a modern property listing website with Next.js that aggregates rental listings and presents them in an organized, searchable format. Users can filter by location, price, and property type.",
      challenges: [
        "Designing an intuitive property search experience",
        "Creating effective filter combinations",
        "Displaying property details in an engaging way",
        "Optimizing images for fast loading"
      ],
      techStack: [
        { name: "Next.js", reason: "SEO-friendly rendering for property listings" },
        { name: "Vercel", reason: "Fast global CDN for quick page loads" },
        { name: "Tailwind CSS", reason: "Consistent styling for property cards" },
        { name: "React", reason: "Interactive filtering and search components" }
      ],
      features: [
        "Property search with filters",
        "Detailed property listings",
        "Location-based browsing",
        "Contact property owners",
        "Mobile-responsive design"
      ],
      tags: ["Next.js", "Vercel", "Real Estate"],
      image: "/images/accra-tracker.png",
      link: "https://accra-rentals.vercel.app/",
      github: "https://github.com/Harold-Odro",
      category: "Web Development"
    }
  ],
};

export const allProjects = [
  ...projectsData['web-projects'],
];

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return allProjects.find(project => project.slug === slug);
};
