// src/App.js
import React, { useState, useEffect, useRef } from "react";
import {
  personalData,
  skills,
  experience,
  projects,
  education
} from "./data/portfolioData";

import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Terminal,
  Database,
  Server,
  Code,
  ExternalLink,
  GraduationCap,
  Cpu,
  MapPin,
  Globe,
  Smartphone,
  Play
} from "lucide-react";
// import { WhatsAppIcon } from "./assets/icons";

const SectionTitle = ({ children }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && displayedText.length < children.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(children.slice(0, displayedText.length + 1));
      }, 75); // Typing speed (lower is faster)

      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, displayedText, children]);

  return (
    <div ref={elementRef} className="mb-8">
      <h2 className="font-mono font-bold text-green-400 flex flex-wrap items-center">
        {/* 1. Prompt: "root@eslam:~$" 
            - Mobile: text-lg (18px) -> Bigger, more readable
            - Laptop: text-2xl (24px) -> Classic size
        */}
        <span className="text-purple-500 mr-2 whitespace-nowrap text-lg md:text-2xl">
          root@eslam:~$
        </span>

        {/* 2. Command + Cursor Wrapper */}
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
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-green-500 selection:text-black">
      {/* Navbar */}
      <nav className="fixed w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-mono text-xl font-bold text-green-400">
            &lt;Eslam /&gt;
          </div>
          <div className="flex gap-4">
            {/* Added target="_blank" and rel="noopener noreferrer" */}
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Github size={20} />
            </a>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-24 pt-10">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-green-400">Hello, my name is</p>
            <h1 className="text-6xl font-bold text-white tracking-tight">
              {personalData.name}.
            </h1>

            {/* Headline & Location Row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold text-slate-400">
                {personalData.title}
              </h2>
              <span className="hidden md:block text-slate-600">/</span>
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <MapPin size={20} className="text-green-400" />
                {personalData.address}
              </div>
            </div>

            <p className="max-w-xl text-lg text-slate-400 mb-8 leading-relaxed">
              {personalData.summary}
            </p>

            {/* Quick Contact Details */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-green-400" />
                {personalData.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-green-400" />
                {personalData.phone}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              {/* Primary Action: Solid Green */}
              <a
                href="#projects"
                className="px-8 py-3 bg-green-500 text-slate-900 font-mono font-bold rounded hover:bg-green-400 transition shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
              >
                View My Work
              </a>

              {/* Secondary Action 1: Outline Green */}
              <a
                href={`mailto:${personalData.email}`}
                className="px-6 py-3 border border-green-500 text-green-400 font-mono font-bold rounded hover:bg-green-500/10 transition"
              >
                Contact Me
              </a>

              {/* Secondary Action 2: Outline Green */}
              {/* <a
                href={personalData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-green-500 text-green-400 font-mono font-bold rounded hover:bg-green-500/10 transition flex items-center gap-2"
              >
                <WhatsAppIcon size={20} />
                <span>WhatsApp</span>
              </a> */}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24">
          <SectionTitle>cd /experience</SectionTitle>
          <div className="border-l-2 border-slate-700 ml-3 space-y-12">
            {experience.map((job, idx) => (
              <div key={idx} className="relative pl-8">
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
          <SectionTitle>cat skills.json</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Backend & Languages */}
            <div className="bg-slate-800/50 p-6 rounded border border-slate-700 hover:border-green-500/50 transition">
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <Server size={24} />
                <h3 className="font-bold text-lg">Backend & Core</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...skills.languages, ...skills.frameworks].map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-sm text-slate-300 hover:text-green-400 hover:border-green-500/50 transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Infrastructure & Tools */}
            <div className="bg-slate-800/50 p-6 rounded border border-slate-700 hover:border-purple-500/50 transition">
              <div className="flex items-center gap-3 mb-4 text-purple-400">
                <Database size={24} />
                <h3 className="font-bold text-lg">Infra & Data</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...skills.databases, ...skills.tools].map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-sm text-slate-300 hover:text-purple-400 hover:border-purple-500/50 transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 3: Architecture & Concepts */}
            <div className="bg-slate-800/50 p-6 rounded border border-slate-700 hover:border-blue-500/50 transition">
              <div className="flex items-center gap-3 mb-4 text-blue-400">
                <Cpu size={24} />
                <h3 className="font-bold text-lg">Architecture & CS</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.concepts.map((skill) => (
                  <span
                    key={skill}
                    className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-sm text-slate-300 hover:text-blue-400 hover:border-blue-500/50 transition cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24">
          <SectionTitle>cat education.txt</SectionTitle>
          <div className="bg-slate-800/50 p-6 rounded border border-slate-700 flex items-start gap-6">
            <div className="p-4 bg-green-500/10 rounded-lg text-green-400 hidden sm:block">
              <GraduationCap size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {education.school}
              </h3>
              <p className="text-xl text-green-400 font-mono mb-2">
                {education.degree}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-mono text-slate-500 mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {education.duration}
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  GPA: {education.gpa}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {education.details}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <SectionTitle>ls ./projects</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-green-500/30 flex flex-col transition duration-300"
              >
                {/* ROW 1: Icon & Links */}
                <div className="flex justify-between items-start mb-4">
                  {/* Icon */}
                  <div className="text-green-400 group-hover:text-green-300 transition">
                    <div className="p-2 rounded-md bg-slate-900/50 border border-slate-700/50">
                      <Code size={28} />
                    </div>
                  </div>

                  {/* Links Row - Now handles GitHub, Demo, and App Stores */}
                  <div className="flex gap-3 text-slate-400">
                    {/* 1. GitHub Repo */}
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

                    {/* 2. Live Website / Demo */}
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

                    {/* 3. Google Play */}
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

                    {/* 4. App Store */}
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
                  {project.tech.map((t) => (
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
          <p className="mb-2">Built with React.js & Tailwind</p>
          <p>
            Designed by <span className="text-green-400">Eslam Amin</span> and{" "}
            <span className="text-blue-400">Gemini</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
