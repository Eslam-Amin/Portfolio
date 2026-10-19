import React from "react";
import { Github, Linkedin, FileText } from "lucide-react";
import { ShimmerBlock } from "./Shimmer";

const Navbar = ({ info, loading }) => {
  return (
    <nav className="fixed w-full bg-slate-900/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {loading ? (
          <ShimmerBlock className="h-7 w-28" />
        ) : (
          <div className="font-mono text-xl font-bold text-green-400">
            {info?.logoText || "<Eslam />"}
          </div>
        )}

        {loading ? (
          <div className="flex gap-4">
            <ShimmerBlock className="h-5 w-5 rounded-full" />
            <ShimmerBlock className="h-5 w-5 rounded-full" />
            <ShimmerBlock className="h-5 w-5 rounded-full" />
          </div>
        ) : (
          <div className="flex gap-4">
            {info?.github && (
              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
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
                className="hover:text-white transition"
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
                className="hover:text-white transition"
                title="Resume / CV"
              >
                <FileText size={20} />
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
