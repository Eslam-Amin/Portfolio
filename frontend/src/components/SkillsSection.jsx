import React, { useState, useEffect } from "react";
import { Server, Database, Cpu, Code, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { SkillsShimmer } from "./Shimmer";
import { fetchSkills, fetchWithWarmupFallback } from "../services/api";
import { skills as fallbackSkills } from "../data/portfolioData";

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

const SkillsSection = ({
  prompt = "root@eslam:~$",
  title = "cat skills.json"
}) => {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const cleanup = fetchWithWarmupFallback(
      fetchSkills,
      "skills",
      fallbackSkills,
      {
        onData: (data) => {
          setSkills(data || fallbackSkills);
        },
        onLoadingChange: setLoading
      }
    );

    return cleanup;
  }, []);

  const resolvedSkills = skills || fallbackSkills;
  const skillCards =
    resolvedSkills?.cards && resolvedSkills.cards.length > 0
      ? resolvedSkills.cards
      : [
          {
            title: "Backend & Core",
            icon: "Server",
            color: "green",
            items: [
              ...(resolvedSkills?.languages || []),
              ...(resolvedSkills?.frameworks || [])
            ]
          },
          {
            title: "Infra & Data",
            icon: "Database",
            color: "purple",
            items: [
              ...(resolvedSkills?.databases || []),
              ...(resolvedSkills?.tools || [])
            ]
          },
          {
            title: "Architecture & CS",
            icon: "Cpu",
            color: "blue",
            items: [...(resolvedSkills?.concepts || [])]
          }
        ];

  return (
    <section className="mb-24">
      <SectionTitle prompt={prompt}>{title}</SectionTitle>
      {loading ? (
        <SkillsShimmer />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCards.map((card, idx) => {
            const IconComponent = ICON_MAP[card.icon] || Server;
            const colorTheme = COLOR_STYLES[card.color] || COLOR_STYLES.green;

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
      )}
    </section>
  );
};

export default SkillsSection;
