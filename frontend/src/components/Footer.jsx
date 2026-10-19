import React from "react";
import { ShimmerBlock } from "./Shimmer";
import { usePortfolioContext } from "../context/PortfolioContext";

const Footer = () => {
  const { footer, infoLoading } = usePortfolioContext();

  if (infoLoading) {
    return (
      <footer className="flex flex-col items-center gap-2 py-8">
        <ShimmerBlock className="h-4 w-48" />
        <ShimmerBlock className="h-4 w-56" />
      </footer>
    );
  }

  return (
    <footer className="text-center text-slate-500 dark:text-slate-600 py-8 text-sm font-mono">
      <p className="mb-2">
        {footer?.builtWith || "Built with React.js & Tailwind"}
      </p>
      <p>
        Designed by{" "}
        <span className="text-green-600 dark:text-green-400">
          {footer?.designedBy || "Eslam Amin"}
        </span>{" "}
        and{" "}
        <span className="text-blue-600 dark:text-blue-400">
          {footer?.coDesignedBy || "Gemini"}
        </span>
      </p>
    </footer>
  );
};

export default Footer;
