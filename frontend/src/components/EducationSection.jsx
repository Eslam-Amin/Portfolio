import React, { useState, useEffect } from "react";
import { GraduationCap } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { EducationShimmer } from "./Shimmer";
import { fetchEducation } from "../services/api";
import { education as fallbackEducation } from "../data/portfolioData";

const EducationSection = ({
  prompt = "root@eslam:~$",
  title = "cat education.txt"
}) => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const defaultList = Array.isArray(fallbackEducation)
      ? fallbackEducation
      : [fallbackEducation];

    fetchEducation()
      .then((data) => {
        if (!isMounted) return;
        setEducationList(
          Array.isArray(data) && data.length > 0 ? data : defaultList
        );
      })
      .catch((err) => {
        console.warn("Education fallback used:", err.message);
        if (isMounted) setEducationList(defaultList);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="mb-24">
      <SectionTitle prompt={prompt}>{title}</SectionTitle>
      {loading ? (
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
