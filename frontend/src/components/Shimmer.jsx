import React from "react";

export const ShimmerBlock = ({ className = "" }) => (
  <div className={`shimmer-wrapper rounded ${className}`} />
);

export const HeroShimmer = () => (
  <div className="flex flex-col gap-4 animate-fadeIn" aria-busy="true">
    <ShimmerBlock className="h-5 w-44" />
    <ShimmerBlock className="h-14 w-72 sm:w-96" />
    <div className="flex flex-col md:flex-row md:items-center gap-4 my-2">
      <ShimmerBlock className="h-8 w-56" />
      <ShimmerBlock className="h-6 w-36" />
    </div>
    <div className="space-y-2 max-w-xl mb-4">
      <ShimmerBlock className="h-4 w-full" />
      <ShimmerBlock className="h-4 w-11/12" />
      <ShimmerBlock className="h-4 w-4/5" />
    </div>
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <ShimmerBlock className="h-5 w-52" />
      <ShimmerBlock className="h-5 w-40" />
    </div>
    <div className="flex gap-4">
      <ShimmerBlock className="h-12 w-40 rounded" />
      <ShimmerBlock className="h-12 w-36 rounded" />
    </div>
  </div>
);

export const ExperienceShimmer = () => (
  <div className="border-l-2 border-slate-700 ml-3 space-y-12" aria-busy="true">
    {[1, 2, 3, 4].map((item) => (
      <div key={item} className="relative pl-8 space-y-3">
        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500/40 animate-pulse" />
        <ShimmerBlock className="h-6 w-64 sm:w-80" />
        <ShimmerBlock className="h-4 w-44" />
        <div className="space-y-2 pt-1">
          <ShimmerBlock className="h-4 w-full" />
          <ShimmerBlock className="h-4 w-11/12" />
          <ShimmerBlock className="h-4 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export const SkillsShimmer = () => (
  <div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    aria-busy="true"
  >
    {[1, 2, 3].map((card) => (
      <div
        key={card}
        className="bg-slate-800/40 p-6 rounded border border-slate-700/70 space-y-4"
      >
        <div className="flex items-center gap-3">
          <ShimmerBlock className="h-6 w-6 rounded" />
          <ShimmerBlock className="h-6 w-36" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((pill) => (
            <ShimmerBlock
              key={pill}
              className={`h-7 ${pill % 2 === 0 ? "w-20" : "w-24"} rounded`}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);
