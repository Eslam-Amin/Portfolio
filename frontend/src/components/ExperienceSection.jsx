import React, { useState, useEffect } from "react";
import SectionTitle from "./SectionTitle";
import { ExperienceShimmer } from "./Shimmer";
import { fetchWorkExperience, fetchWithWarmupFallback } from "../services/api";
import { experience as fallbackExperience } from "../data/portfolioData";

const ExperienceSection = ({
  prompt = "root@eslam:~$",
  title = "cd /experience"
}) => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const cleanup = fetchWithWarmupFallback(
      fetchWorkExperience,
      "experience",
      fallbackExperience,
      {
        onData: (data) => {
          setExperience(
            Array.isArray(data) && data.length > 0 ? data : fallbackExperience
          );
        },
        onLoadingChange: setLoading
      }
    );

    return cleanup;
  }, []);

  return (
    <section className="mb-24">
      <SectionTitle prompt={prompt}>{title}</SectionTitle>
      {loading ? (
        <ExperienceShimmer />
      ) : (
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
      )}
    </section>
  );
};

export default ExperienceSection;
