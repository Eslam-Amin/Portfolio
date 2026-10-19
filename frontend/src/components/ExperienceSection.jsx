import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "./SectionTitle";
import { ExperienceShimmer } from "./Shimmer";
import { fetchWorkExperience, getFallbackSectionData } from "../services/api";
import { experience as fallbackExperience } from "../data/portfolioData";
import { usePortfolioContext } from "../context/PortfolioContext";

const ExperienceSection = () => {
  const { terminalPrompt, sectionTitles } = usePortfolioContext();
  const [warmupData, setWarmupData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchWorkExperience,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      try {
        localStorage.setItem(
          "eslam_portfolio_section_experience",
          JSON.stringify(data)
        );
      } catch (err) {
        // Ignore storage errors
      }
      return;
    }

    if (isError) {
      getFallbackSectionData("experience", fallbackExperience).then(
        setWarmupData
      );
      return;
    }

    const timerId = setTimeout(() => {
      getFallbackSectionData("experience", fallbackExperience).then(
        setWarmupData
      );
    }, 1200);

    return () => clearTimeout(timerId);
  }, [data, isError]);

  const showShimmer = isLoading && !warmupData && !data;
  const experience =
    Array.isArray(data) && data.length > 0
      ? data
      : Array.isArray(warmupData) && warmupData.length > 0
      ? warmupData
      : fallbackExperience;

  return (
    <section className="mb-24">
      <SectionTitle prompt={terminalPrompt}>
        {sectionTitles?.experience || "cd /experience"}
      </SectionTitle>
      {showShimmer ? (
        <ExperienceShimmer />
      ) : (
        <div className="border-l-2 border-slate-300 dark:border-slate-700 ml-3 space-y-12">
          {experience.map((job, idx) => (
            <div key={job._id || idx} className="relative pl-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-600 dark:bg-green-500" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {job.role}{" "}
                <span className="text-green-600 dark:text-green-400">
                  @ {job.company}
                </span>
              </h3>
              <p className="font-mono text-sm text-slate-500 mb-2">
                {job.duration} | {job.type}
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExperienceSection;
