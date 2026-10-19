import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Code, Github, Globe, Play, Smartphone } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { ProjectsShimmer } from "./Shimmer";
import { fetchProjects, getFallbackSectionData } from "../services/api";
import { projects as fallbackProjects } from "../data/portfolioData";
import { usePortfolioContext } from "../context/PortfolioContext";

const ProjectsSection = () => {
  const { terminalPrompt, sectionTitles } = usePortfolioContext();
  const [warmupData, setWarmupData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      try {
        localStorage.setItem(
          "eslam_portfolio_section_projects",
          JSON.stringify(data)
        );
      } catch (err) {
        // Ignore storage errors
      }
      return;
    }

    if (isError) {
      getFallbackSectionData("projects", fallbackProjects).then(setWarmupData);
      return;
    }

    const timerId = setTimeout(() => {
      getFallbackSectionData("projects", fallbackProjects).then(setWarmupData);
    }, 1200);

    return () => clearTimeout(timerId);
  }, [data, isError]);

  const showShimmer = isLoading && !warmupData && !data;
  const projects =
    Array.isArray(data) && data.length > 0
      ? data
      : Array.isArray(warmupData) && warmupData.length > 0
      ? warmupData
      : fallbackProjects;

  return (
    <section id="projects" className="mb-24">
      <SectionTitle prompt={terminalPrompt}>
        {sectionTitles?.projects || "ls ./projects"}
      </SectionTitle>

      {showShimmer ? (
        <ProjectsShimmer />
      ) : (
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
      )}
    </section>
  );
};

export default ProjectsSection;
