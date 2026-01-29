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
  concepts: [
    "Data Structures",
    "Algorithms",
    "SOLID Principles",
    "Design Patterns",
    "System Design",
    "Unit Testing (Jest)",
    "Microservices Architecture"
  ],
  tools: [
    "Docker",
    "Kafka",
    "Git/GitHub",
    "CI/CD",
    "Socket.io",
    "GraphQL",
    "Swagger"
  ]
};

export const experience = [
  {
    company: "AIM Technologies",
    role: "Software Engineer",
    duration: "June 2025 - Nov 2025",
    type: "Hybrid",
    description:
      "Developing a Social Media Listening Tool using MERN Stack and NestJS. Enhanced tool performance, fixed production issues, and assisted in tool rebranding."
  },
  {
    company: "Amwal",
    role: "Backend Developer",
    duration: "Mar 2025 - Apr 2025",
    type: "Remote",
    description:
      "Developed Supply Chain Finance services. Migrated raw MySQL queries to TypeORM, implemented class-validator, and collaborated on JWT security enhancements."
  },
  {
    company: "Neon",
    role: "Backend Developer",
    duration: "May 2024 - June 2025",
    type: "On-Site",
    description:
      "Built scalable web apps for E-Commerce and E-Learning. Optimized MongoDB/MySQL indexing to reduce latency. Debugged and resolved errors in existing codebases."
  }
];

export const projects = [
  {
    title: "Event Management API",
    tech: ["Go", "Gin", "MySQL", "JWT"],
    desc: "Lightweight REST API for event registration and CRUD operations. Built with Go Modules.",
    github: "#"
  },
  {
    title: "Car Selling API",
    tech: ["NestJS", "TypeORM", "MySQL", "Redis"],
    desc: "Comprehensive REST API for car sales. Features In-Memory caching, Unit Testing, and e2e Testing.",
    github: "#"
  },
  {
    title: "Restaurant Management API",
    tech: ["NestJS", "MongoDB", "Swagger"],
    desc: "Lightweight REST API for managing restaurants and users, documented with Swagger.",
    github: "#"
  },
  {
    title: "OneFurever",
    tech: ["Node.js", "Socket.io", "Firebase", "PayMob"],
    desc: "Real-time community app for pet owners. Features live chat, push notifications, and payment integration.",
    link: "#"
  },
  {
    title: "HAJJO E-Commerce",
    tech: ["Node.js", "Express", "Redis", "PayMob"],
    desc: "Backend for a suits e-commerce platform. Implemented Redis caching to enhance performance mechanism.",
    link: "#"
  },
  {
    title: "o'Curls",
    tech: ["Node.js", "Express", "MongoDB", "PayMob"],
    desc: "Curly hair products e-commerce. Migrated legacy iframe payments to Unified Checkout with PayMob.",
    link: "#"
  },
  {
    title: "Social Network",
    tech: ["MERN Stack", "Socket.io", "ContextAPI"],
    desc: "Facebook clone with real-time messaging. Mimics older FB UI with modern backend architecture.",
    github: "#"
  },
  {
    title: "Market Backend Service",
    tech: ["Node.js", "MySQL", "MongoDB", "JWT"],
    desc: "Hybrid database system (SQL & NoSQL) for managing branches, cashiers, products, and receipts.",
    github: "#"
  },
  {
    title: "Explorer Enthusiast",
    tech: ["Node.js", "MapBox", "Pug", "MongoDB"],
    desc: "Tour management app. Integrated MapBox for displaying tour locations and geo-data.",
    github: "#"
  }
];
