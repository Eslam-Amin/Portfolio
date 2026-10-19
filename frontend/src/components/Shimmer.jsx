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
