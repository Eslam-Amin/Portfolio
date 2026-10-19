import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { EducationShimmer } from "./Shimmer";
import { fetchEducation, getFallbackSectionData } from "../services/api";
import { education as fallbackEducation } from "../data/portfolioData";
import { usePortfolioContext } from "../context/PortfolioContext";

const defaultList = Array.isArray(fallbackEducation)
  ? fallbackEducation
  : [fallbackEducation];

const EducationSection = () => {
  const { terminalPrompt, sectionTitles } = usePortfolioContext();
  const [warmupData, setWarmupData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["education"],
    queryFn: fetchEducation,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      try {
        localStorage.setItem(
          "eslam_portfolio_section_education",
          JSON.stringify(data)
        );
      } catch (err) {
        // Ignore storage errors
      }
      return;
    }

    if (isError) {
      getFallbackSectionData("education", defaultList).then(setWarmupData);
      return;
    }

    const timerId = setTimeout(() => {
      getFallbackSectionData("education", defaultList).then(setWarmupData);
    }, 1200);

    return () => clearTimeout(timerId);
  }, [data, isError]);

  const showShimmer = isLoading && !warmupData && !data;
  const educationList =
    Array.isArray(data) && data.length > 0
      ? data
      : Array.isArray(warmupData) && warmupData.length > 0
      ? warmupData
      : defaultList;

  return (
    <section className="mb-24">
      <SectionTitle prompt={terminalPrompt}>
        {sectionTitles?.education || "cat education.txt"}
      </SectionTitle>
      {showShimmer ? (
        <EducationShimmer />
      ) : (
        <div className="space-y-6">
          {educationList.map((edu, idx) => (
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
                <p className="text-slate-400 leading-relaxed">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default EducationSection;
