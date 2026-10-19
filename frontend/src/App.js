// src/App.js
import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {
  personalData as fallbackPersonalData,
  skills as fallbackSkills,
  experience as fallbackExperience,
  projects as fallbackProjects,
  education as fallbackEducation
} from "./data/portfolioData";
import { fetchPortfolioData } from "./services/api";

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Database,
  Server,
  Code,
  GraduationCap,
  Cpu,
  MapPin,
  Globe,
  Smartphone,
  Play,
  FileText
} from "lucide-react";

const ICON_MAP = {
  Server,
  Database,
  Cpu,
  Code,
  Globe
};

const COLOR_STYLES = {
  green: {
    cardBorder: "hover:border-green-500/50",
    headerText: "text-green-400",
    badgeHover: "hover:text-green-400 hover:border-green-500/50"
  },
  purple: {
    cardBorder: "hover:border-purple-500/50",
    headerText: "text-purple-400",
    badgeHover: "hover:text-purple-400 hover:border-purple-500/50"
  },
  blue: {
    cardBorder: "hover:border-blue-500/50",
    headerText: "text-blue-400",
    badgeHover: "hover:text-blue-400 hover:border-blue-500/50"
  }
};

const SectionTitle = ({ children, prompt = "root@eslam:~$" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const text = String(children || "");

  useEffect(() => {
    const node = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  useEffect(() => {
    setDisplayedText("");
  }, [text]);

  useEffect(() => {
    if (isVisible && displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 75);

      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, displayedText, text]);

  return (
    <div ref={elementRef} className="mb-8">
      <h2 className="font-mono font-bold text-green-400 flex flex-wrap items-center">
        <span className="text-purple-500 mr-2 whitespace-nowrap text-lg md:text-2xl">
          {prompt}
        </span>

        <span className="text-lg md:text-2xl break-all">
          {displayedText}
          <span
            className="ml-1 animate-pulse text-green-500 font-black inline-block"
            style={{ animationDuration: "0.75s" }}
          >
            _
          </span>
        </span>
      </h2>
    </div>
  );
};

function App() {
  const [portfolio, setPortfolio] = useState({
    personalData: fallbackPersonalData,
    skills: fallbackSkills,
    experience: fallbackExperience,
    education: Array.isArray(fallbackEducation)
      ? fallbackEducation
      : [fallbackEducation],
    projects: fallbackProjects
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchPortfolioData()
      .then((data) => {
        if (!isMounted || !data) return;
        setPortfolio({
          personalData: data.personalData || fallbackPersonalData,
          skills: data.skills || fallbackSkills,
          experience:
            Array.isArray(data.experience) && data.experience.length > 0
              ? data.experience
              : fallbackExperience,
          education:
            Array.isArray(data.education) && data.education.length > 0
              ? data.education
              : Array.isArray(fallbackEducation)
              ? fallbackEducation
              : [fallbackEducation],
          projects:
            Array.isArray(data.projects) && data.projects.length > 0
              ? data.projects
              : fallbackProjects
        });
      })
      .catch((err) => {
        console.warn(
          "Using local fallback portfolio data (backend unreachable):",
          err.message
        );
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const { personalData, skills, experience, education, projects } = portfolio;
  const terminalPrompt = personalData.terminalPrompt || "root@eslam:~$";
  const sectionTitles = personalData.sectionTitles || {};
  const footer = personalData.footer || {};

  // Build skill cards dynamically from DB cards or fallback categories
  const skillCards =
    skills?.cards && skills.cards.length > 0
      ? skills.cards
      : [
          {
            title: "Backend & Core",
            icon: "Server",
            color: "green",
            items: [
              ...(skills?.languages || []),
              ...(skills?.frameworks || [])
            ]
          },
          {
            title: "Infra & Data",
            icon: "Database",
            color: "purple",
            items: [...(skills?.databases || []), ...(skills?.tools || [])]
          },
          {
            title: "Architecture & CS",
            icon: "Cpu",
            color: "blue",
            items: [...(skills?.concepts || [])]
          }
        ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-300 font-mono flex items-center justify-center px-6">
        <div className="text-lg md:text-2xl text-green-400">
          <span className="text-purple-500 mr-2">{terminalPrompt}</span>
          fetching portfolio_data...
          <span className="ml-1 animate-pulse text-green-500 font-black">_</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-green-500 selection:text-black">
      {/* Navbar */}
      <nav className="fixed w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono text-xl font-bold text-green-400">
            {personalData.logoText || "<Eslam />"}
          </div>
          <div className="flex gap-4">
            {personalData.github && (
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Github size={20} />
              </a>
            )}
            {personalData.linkedin && (
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <Linkedin size={20} />
              </a>
            )}
            {personalData.cvLink && (
              <a
                href={personalData.cvLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <FileText size={20} />
              </a>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-24 pt-10">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-green-400">
              {personalData.greeting || "Hello, my name is"}
            </p>
            <h1 className="text-6xl font-bold text-white tracking-tight">
              {personalData.name}.
            </h1>

            {/* Headline & Location Row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-slate-400">
                {personalData.title}
              </h2>
              {personalData.address && (
                <>
                  <span className="hidden md:block text-slate-600">/</span>
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <MapPin size={20} className="text-green-400" />
                    {personalData.address}
                  </div>
                </>
              )}
            </div>

            <p className="max-w-xl text-lg text-slate-400 mb-8 leading-relaxed">
              {personalData.summary}
            </p>

            {/* Quick Contact Details */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm font-mono text-slate-400">
              {personalData.email && (
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-green-400" />
                  {personalData.email}
                </div>
              )}
              {personalData.phone && (
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-green-400" />
                  {personalData.phone}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#projects"
                className="px-8 py-3 bg-green-500 text-slate-900 font-mono font-bold rounded hover:bg-green-400 transition shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                {personalData.ctaPrimaryText || "View My Work"}
              </a>

              {personalData.email && (
                <a
                  href={`mailto:${personalData.email}`}
                  className="px-6 py-3 border border-green-500 text-green-400 font-mono font-bold rounded hover:bg-green-500/10 transition"
                >
                  {personalData.ctaSecondaryText || "Contact Me"}
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <SectionTitle prompt={terminalPrompt}>
            {sectionTitles.experience || "cd /experience"}
          </SectionTitle>
          <div className="border-l-2 border-slate-700 ml-3 space-y-12">
            {experience.map((job, idx) => (
              <div key={job._id || idx} className="relative pl-8">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500" />
                <h3 className="text-xl font-bold text-white">
                  {job.role}{" "}
                  <span className="text-green-400">@ {job.company}</span>
                </h3>
                <p className="font-mono text-sm text-slate-500 mb-2">
                  {job.duration} | {job.type}
                </p>
                <p className="text-slate-400">{job.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-24">
          <SectionTitle prompt={terminalPrompt}>
            {sectionTitles.skills || "cat skills.json"}
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCards.map((card, idx) => {
              const IconComponent = ICON_MAP[card.icon] || Server;
              const colorTheme =
                COLOR_STYLES[card.color] || COLOR_STYLES.green;

              return (
                <div
                  key={card._id || idx}
                  className={`bg-slate-800/50 p-6 rounded border border-slate-700 ${colorTheme.cardBorder} transition`}
                >
                  <div
                    className={`flex items-center gap-3 mb-4 ${colorTheme.headerText}`}
                  >
                    <IconComponent size={24} />
                    <h3 className="font-bold text-lg">{card.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(card.items || []).map((skill) => (
                      <span
                        key={skill}
                        className={`bg-slate-900 border border-slate-700 px-3 py-1 rounded text-sm text-slate-300 ${colorTheme.badgeHover} transition cursor-default`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24">
          <SectionTitle prompt={terminalPrompt}>
            {sectionTitles.education || "cat education.txt"}
          </SectionTitle>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={edu._id || idx}
                className="bg-slate-800/50 p-6 rounded border border-slate-700 flex items-start gap-6"
              >
                <div className="p-4 bg-green-500/10 rounded-lg text-green-400 hidden sm:block">
                  <GraduationCap size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {edu.school}
                  </h3>
                  <p className="text-xl text-green-400 font-mono mb-2">
                    {edu.degree}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-slate-500 mb-4">
                    {edu.duration && (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        {edu.duration}
                      </span>
                    )}
                    {edu.gpa && (
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <SectionTitle prompt={terminalPrompt}>
            {sectionTitles.projects || "ls ./projects"}
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={project._id || idx}
                className="group bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-green-500/30 flex flex-col transition duration-300"
              >
                {/* ROW 1: Icon & Links */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-green-400 group-hover:text-green-300 transition">
                    <div className="p-2 rounded-md bg-slate-900/50 border border-slate-700/50">
                      <Code size={28} />
                    </div>
                  </div>

                  <div className="flex gap-3 text-slate-400">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition bg-slate-900/50 p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-green-500/30"
                        title="View Code"
                      >
                        <Github size={18} />
                      </a>
                    )}

                    {(project.demo || project.link) && (
                      <a
                        href={project.demo || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition bg-slate-900/50 p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-blue-500/30"
                        title="Live Demo"
                      >
                        <Globe size={18} />
                      </a>
                    )}

                    {project.googlePlay && (
                      <a
                        href={project.googlePlay}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400 transition bg-slate-900/50 p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-green-500/30"
                        title="Google Play"
                      >
                        <Play size={18} />
                      </a>
                    )}

                    {project.appStore && (
                      <a
                        href={project.appStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-400 transition bg-slate-900/50 p-2 rounded-full hover:bg-slate-900 border border-transparent hover:border-purple-500/30"
                        title="App Store"
                      >
                        <Smartphone size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* ROW 2: Title & Date */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500 whitespace-nowrap">
                    <span className="mr-2 text-slate-700 hidden md:inline">
                      __
                    </span>
                    {project.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                  {(project.tech || []).map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-green-300/80 bg-green-900/10 px-2 py-1 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-slate-600 py-8 text-sm font-mono">
          <p className="mb-2">
            {footer.builtWith || "Built with React.js & Tailwind"}
          </p>
          <p>
            Designed by{" "}
            <span className="text-green-400">
              {footer.designedBy || "Eslam Amin"}
            </span>{" "}
            and{" "}
            <span className="text-blue-400">
              {footer.coDesignedBy || "Gemini"}
            </span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
