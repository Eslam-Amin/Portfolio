// src/data/portfolioData.js

export const personalData = {
  name: "Eslam Amin",
  title: "Backend Developer",
  email: "ea.eslamamin@gmail.com",
  phone: "+201099007326",
  address: "Cairo, Egypt",
  github: "https://github.com/Eslam-Amin",
  linkedin: "https://linkedin.com/in/eslam-amin",
  summary:
    "Backend Developer with ~2 years of experience building scalable, high-performance systems. Skilled in Node.js, NestJS, Go, SQL, and MongoDB. Proven track record in fintech, e-commerce, and social media solutions."
};

export const education = {
  school: "Future Academy, Cairo",
  degree: "Bachelor's Degree in Computer Science",
  duration: "2018 - 2022",
  gpa: "3.69/4",
  details: "Graduated with a focus on Software Engineering and Data Structures."
};

export const skills = {
  languages: ["Go (Golang)", "TypeScript", "JavaScript (ES6+)", "SQL"],
  frameworks: ["NestJS", "Express.js", "Gin", "ReactJS (Basics)"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  tools: ["Docker", "Kafka", "Git/GitHub", "CI/CD", "Socket.io", "Swagger"],
  concepts: [
    "Data Structures",
    "Algorithms",
    "SOLID Principles",
    "Design Patterns",
    "System Design",
    "Unit Testing (Jest)",
    "Microservices Architecture"
  ]
};

export const experience = [
  {
    company: "AIM Technologies",
    role: "Software Engineer",
    duration: "June 2025 - Nov 2025",
    type: "Hybrid",
    description:
      "Developed a Social Media Listening Tool using MERN Stack and NestJS. Focused on enhancing tool performance, resolving critical production issues, and assisting in the complete rebranding of the tool's architecture."
  },
  {
    company: "Amwal",
    role: "Backend Developer",
    duration: "Mar 2025 - Apr 2025",
    type: "Remote",
    description:
      "Built a Supply Chain Finance service. Successfully migrated legacy raw MySQL queries to TypeORM repositories for maintainability. Implemented class-validator for strict HTTP request validation and collaborated on security enhancements using JWT."
  },
  {
    company: "Neon",
    role: "Backend Developer",
    duration: "May 2024 - June 2025",
    type: "On-Site",
    description:
      "Developed scalable web applications for E-Commerce and E-Learning platforms. Optimized database performance by indexing MongoDB and MySQL queries, significantly reducing system latency. Debugged and resolved complex errors to ensure platform stability."
  }
];

export const projects = [
  {
    title: "Event Management API",
    date: "2025",
    tech: ["Go", "Gin", "MySQL", "JWT"],
    desc: "A lightweight REST API for managing event lifecycles. Users can register/cancel attendance and perform full CRUD operations. Built using Go Modules for dependency management.",
    github: "https://github.com/Eslam-Amin/Event-Management-Api"
  },
  {
    title: "Car Selling API",
    date: "2025",
    tech: ["NestJS", "TypeORM", "MySQL", "Redis"],
    desc: "Comprehensive REST API for car sales reports. Features In-Memory caching for speed, extensive Unit/E2E testing, and a modular architecture using NestJS.",
    github: "https://github.com/Eslam-Amin/Car-Selling-Api"
  },
  {
    title: "Restaurant Management API",
    date: "2025",
    tech: ["NestJS", "MongoDB", "Swagger"],
    desc: "A scalable system for managing restaurants and user data. Fully documented using Swagger UI for easy frontend integration.",
    github: "https://github.com/Eslam-Amin/Restaurant-Management-Api"
  },
  {
    title: "OneFurever",
    date: "Aug 2024 - June 2025",
    tech: ["Node.js", "Socket.io", "Firebase", "PayMob"],
    desc: "A community platform for pet owners offering real-time chat and services. Integrated Firebase for push notifications and PayMob for secure transactions.",
    link: "https://onefurever.com"
  },
  {
    title: "HAJJO E-Commerce",
    date: "July 2024 - Sep 2024",
    tech: ["Node.js", "Express", "Redis", "PayMob"],
    desc: "Backend server built from scratch for a suits e-commerce brand. Implemented Redis caching to optimize product retrieval speeds and integrated local payment gateways."
  },
  {
    title: "o'Curls",
    date: "2024",
    tech: ["Node.js", "Express", "MongoDB", "PayMob"],
    desc: "E-commerce solution for hair products. Key contribution involved upgrading the payment infrastructure from legacy iframes to a modern Unified Checkout with PayMob.",
    link: "https://www.o-curls.com/"
  },
  {
    title: "Social Network",
    date: "2024",
    tech: ["MERN Stack", "Socket.io", "ContextAPI"],
    desc: "A social platform mimicking the classic Facebook experience. Features real-time messaging using Socket.io and a reactive frontend built with ContextAPI.",
    github: "https://github.com/Eslam-Amin/Social-Network-Backend"
  },
  {
    title: "Market Backend Service",
    date: "2024",
    tech: ["Node.js", "MySQL", "MongoDB", "JWT"],
    desc: "A complex system managing branches, cashiers, and receipts. Demonstrates ability to work with hybrid database architectures (SQL & NoSQL) simultaneously.",
    github: "https://github.com/Eslam-Amin/Market-Backend"
  },
  {
    title: "Explorer Enthusiast",
    date: "2024",
    tech: ["Node.js", "MapBox", "Pug", "MongoDB"],
    desc: "Tour management application featuring geo-spatial data visualization. Integrated MapBox API to display tour locations on interactive maps.",
    github: "https://github.com/Eslam-Amin/Explorer-Enthusiast-Backend"
  },
  {
    title: "Portfolio v1.0 (Legacy)",
    date: "2024",
    tech: ["HTML/CSS", "JavaScript", "Bootstrap"],
    desc: "My original frontend-focused portfolio. Archived here to demonstrate my progression into backend engineering.",
    link: "https://eslam-amin-portfolio.netlify.app/"
  }
];
