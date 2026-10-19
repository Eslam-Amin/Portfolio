import "./App.css";
import React, { useState, useCallback } from "react";
import { personalData as fallbackPersonalData } from "./data/portfolioData";
import Navbar from "./components/Navbar";
import InformationSection from "./components/InformationSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

function App() {
  const [info, setInfo] = useState(fallbackPersonalData);
  const [infoLoading, setInfoLoading] = useState(true);

  const handleInfoLoaded = useCallback((loadedInfo, isLoading) => {
    if (loadedInfo) {
      setInfo(loadedInfo);
    }
    setInfoLoading(isLoading);
  }, []);

  const terminalPrompt = info?.terminalPrompt || "root@eslam:~$";
  const sectionTitles = info?.sectionTitles || {};

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-green-500 selection:text-black">
      <Navbar info={info} loading={infoLoading} />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <InformationSection onInfoLoaded={handleInfoLoaded} />

        <ExperienceSection
          prompt={terminalPrompt}
          title={sectionTitles.experience || "cd /experience"}
        />

        <SkillsSection
          prompt={terminalPrompt}
          title={sectionTitles.skills || "cat skills.json"}
        />

        <EducationSection
          prompt={terminalPrompt}
          title={sectionTitles.education || "cat education.txt"}
        />

        <ProjectsSection
          prompt={terminalPrompt}
          title={sectionTitles.projects || "ls ./projects"}
        />

        <Footer footer={info?.footer} loading={infoLoading} />
      </main>
    </div>
  );
}

export default App;
