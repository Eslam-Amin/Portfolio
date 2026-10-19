import React from "react";
import { Github, Linkedin, FileText, Sun, Moon } from "lucide-react";
import { ShimmerBlock } from "./Shimmer";
import { usePortfolioContext } from "../context/PortfolioContext";

const Navbar = () => {
  const { info, infoLoading, theme, toggleTheme } = usePortfolioContext();

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {infoLoading ? (
          <ShimmerBlock className="h-7 w-28" />
        ) : (
          <div className="font-mono text-xl font-bold text-green-600 dark:text-green-400">
            {info?.logoText || "<Eslam />"}
          </div>
        )}

        <div className="flex items-center gap-4">
          {infoLoading ? (
            <div className="flex gap-4">
              <ShimmerBlock className="h-5 w-5 rounded-full" />
              <ShimmerBlock className="h-5 w-5 rounded-full" />
              <ShimmerBlock className="h-5 w-5 rounded-full" />
            </div>
          ) : (
            <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
              {info?.github && (
                <a
                  href={info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
              )}
              {info?.linkedin && (
                <a
                  href={info.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              )}
              {info?.cvLink && (
                <a
                  href={info.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition"
                  title="Resume / CV"
                >
                  <FileText size={20} />
                </a>
              )}
            </div>
          )}

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            aria-pressed={theme === "dark"}
            title={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-green-500/50 hover:text-green-600 dark:hover:text-green-400 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
