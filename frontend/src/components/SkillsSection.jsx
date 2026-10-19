import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Server, Database, Cpu, Code, Globe } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { SkillsShimmer } from "./Shimmer";
import { fetchSkills, getFallbackSectionData } from "../services/api";
import { skills as fallbackSkills } from "../data/portfolioData";
import { usePortfolioContext } from "../context/PortfolioContext";

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
    headerText: "text-green-600 dark:text-green-400",
    badgeHover:
      "hover:text-green-600 dark:hover:text-green-400 hover:border-green-500/50"
  },
  purple: {
    cardBorder: "hover:border-purple-500/50",
    headerText: "text-purple-600 dark:text-purple-400",
    badgeHover:
      "hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/50"
  },
  blue: {
    cardBorder: "hover:border-blue-500/50",
    headerText: "text-blue-600 dark:text-blue-400",
    badgeHover:
      "hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50"
  }
};

const SkillsSection = () => {
  const { terminalPrompt, sectionTitles } = usePortfolioContext();
  const [warmupData, setWarmupData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  useEffect(() => {
    if (data) {
      try {
        localStorage.setItem(
          "eslam_portfolio_section_skills",
          JSON.stringify(data)
        );
      } catch (err) {
        // Ignore storage errors
      }
      return;
    }

    if (isError) {
      getFallbackSectionData("skills", fallbackSkills).then(setWarmupData);
      return;
    }

    const timerId = setTimeout(() => {
      getFallbackSectionData("skills", fallbackSkills).then(setWarmupData);
    }, 1200);

    return () => clearTimeout(timerId);
  }, [data, isError]);

  const showShimmer = isLoading && !warmupData && !data;
  const resolvedSkills = data || warmupData || fallbackSkills;
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
      <SectionTitle prompt={terminalPrompt}>
        {sectionTitles?.skills || "cat skills.json"}
      </SectionTitle>
      {showShimmer ? (
        <SkillsShimmer />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCards.map((card, idx) => {
            const IconComponent = ICON_MAP[card.icon] || Server;
            const colorTheme = COLOR_STYLES[card.color] || COLOR_STYLES.green;

            return (
              <div
                key={card._id || idx}
                className={`bg-white dark:bg-slate-800/50 p-6 rounded border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none ${colorTheme.cardBorder} transition`}
              >
                <div
                  className={`flex items-center gap-3 mb-4 ${colorTheme.headerText}`}
                >
                  <IconComponent size={24} />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-inherit">
                    {card.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(card.items || []).map((skill) => (
                    <span
                      key={skill}
                      className={`bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 py-1 rounded text-sm text-slate-700 dark:text-slate-300 ${colorTheme.badgeHover} transition cursor-default`}
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
