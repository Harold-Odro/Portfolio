export const projectsData = {
  'web-projects': [
    {
      title: "Priselle",
      description: "Modern web application built with cutting-edge technologies",
      tags: ["React", "Tailwind CSS", "Full Stack"],
      image: "/images/priselle.jpeg",
      link: "https://priselle.fly.dev",
      category: "Web Development"
    },
    {
      title: "Good Nature & Co",
      description: "E-commerce website with modern design and seamless user experience",
      tags: ["Next.js", "Vercel", "E-commerce"],
      image: "/images/goodnature.jpeg",
      link: "https://good-natureand-co.vercel.app/",
      category: "Web Development"
    },
    {
      title: "Movie Tracker",
      description: "Website that displays movie information using the TMDB API",
      tags: ["React", "Tailwind CSS", "API Integration"],
      image: "/images/movietracker.png",
      link: "https://movietracker.fly.dev",
      category: "Web Development"
    },
    {
      title: "Accra Rentals",
      description: "Property rental platform for finding apartments and homes in Accra",
      tags: ["Next.js", "Vercel", "Real Estate"],
      image: "/images/accra-tracker.png",
      link: "https://accra-rentals.vercel.app/",
      category: "Web Development"
    }
  ],
};

export const allProjects = [
  ...projectsData['web-projects'],
];
