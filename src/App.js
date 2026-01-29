// src/App.js
import React, { useState } from "react";
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
  MapPin
} from "lucide-react";

const SectionTitle = ({ children }) => (
  <h2 className="text-2xl font-mono font-bold text-green-400 mb-6 flex items-center">
    <span className="text-purple-500 mr-2">root@eslam:~$</span>
    {children}

    {/* The Fast Flashing Cursor */}
    <span
      className="ml-1 animate-pulse text-green-500 font-black"
      style={{
        animationDuration: "0.8s"
      }} /* Change this number to make it faster/slower */
    >
      _
    </span>
  </h2>
);

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

            {/* NEW: Quick Contact Details */}
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

            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-6 py-3 bg-green-500 text-slate-900 font-mono font-bold rounded hover:bg-green-400 transition"
              >
                View My Work
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="px-6 py-3 border border-green-500 text-green-400 font-mono rounded hover:bg-green-500/10 transition"
              >
                Contact Me
              </a>
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

        {/* Projects Section */}
        <section id="projects" className="mb-24">
          <SectionTitle>ls ./projects</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group bg-slate-800 p-6 rounded hover:-translate-y-2 transition duration-300 border border-transparent hover:border-green-500/30"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-green-400">
                    <Code size={40} />
                  </div>
                  <div className="flex gap-4 text-slate-400">
                    {/* GitHub Link */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {/* Live Demo Link */}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-400"
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs font-mono text-green-300">
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
