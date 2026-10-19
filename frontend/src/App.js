import "./App.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PortfolioProvider } from "./context/PortfolioContext";
import Navbar from "./components/Navbar";
import InformationSection from "./components/InformationSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import Footer from "./components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: 2
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortfolioProvider>
        <div className="min-h-screen bg-slate-900 text-slate-300 font-sans selection:bg-green-500 selection:text-black">
          <Navbar />

          <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
            <InformationSection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
            <ProjectsSection />
            <Footer />
          </main>
        </div>
      </PortfolioProvider>
    </QueryClientProvider>
  );
}

export default App;
