import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";
import { personalData as fallbackPersonalData } from "../data/portfolioData";

const PortfolioContext = createContext(null);
const THEME_STORAGE_KEY = "eslam_portfolio_theme";

const getInitialTheme = () => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch (err) {
    // Ignore storage read errors
  }
  return "dark";
};

export const PortfolioProvider = ({ children }) => {
  const [info, setInfo] = useState(fallbackPersonalData);
  const [infoLoading, setInfoLoading] = useState(true);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (err) {
      // Ignore storage write errors
    }
  }, [theme]);

  useEffect(() => {
    const handleStorage = (e) => {
      if (
        e.key === THEME_STORAGE_KEY &&
        (e.newValue === "light" || e.newValue === "dark")
      ) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => {
    const terminalPrompt = info?.terminalPrompt || "root@eslam:~$";
    const sectionTitles = info?.sectionTitles || {
      experience: "cd /experience",
      skills: "cat skills.json",
      education: "cat education.txt",
      projects: "ls ./projects"
    };
    const footer = info?.footer || {
      builtWith: "Built with React.js & Tailwind",
      designedBy: "Eslam Amin",
      coDesignedBy: "Gemini"
    };

    return {
      info,
      setInfo,
      infoLoading,
      setInfoLoading,
      theme,
      toggleTheme,
      terminalPrompt,
      sectionTitles,
      footer
    };
  }, [info, infoLoading, theme, toggleTheme]);

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioContext must be used within a PortfolioProvider"
    );
  }
  return context;
};
