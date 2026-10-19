import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin } from "lucide-react";
import { fetchInformation, getFallbackSectionData } from "../services/api";
import { personalData as fallbackPersonalData } from "../data/portfolioData";
import { usePortfolioContext } from "../context/PortfolioContext";
import { HeroShimmer } from "./Shimmer";

const InformationSection = () => {
  const { setInfo, setInfoLoading } = usePortfolioContext();
  const [warmupData, setWarmupData] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["information"],
    queryFn: fetchInformation,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  useEffect(() => {
    if (data) {
      setInfo(data);
      setInfoLoading(false);
      try {
        localStorage.setItem(
          "eslam_portfolio_section_personalData",
          JSON.stringify(data)
        );
      } catch (err) {
        // Ignore storage errors
      }
      return;
    }

    if (isError) {
      getFallbackSectionData("personalData", fallbackPersonalData).then(
        (fallback) => {
          setWarmupData(fallback);
          setInfo(fallback);
          setInfoLoading(false);
        }
      );
      return;
    }

    const timerId = setTimeout(() => {
      getFallbackSectionData("personalData", fallbackPersonalData).then(
        (fallback) => {
          setWarmupData(fallback);
          setInfo(fallback);
          setInfoLoading(false);
        }
      );
    }, 1200);

    return () => clearTimeout(timerId);
  }, [data, isError, setInfo, setInfoLoading]);

  const showShimmer = isLoading && !warmupData && !data;
  const personalData = data || warmupData || fallbackPersonalData;

  return (
    <section className="mb-24 pt-10">
      {showShimmer ? (
        <HeroShimmer />
      ) : (
        <div className="flex flex-col gap-2">
          <p className="font-mono text-green-400">
            {personalData.greeting || "Hello, my name is"}
          </p>
          <h1 className="text-6xl font-bold text-white tracking-tight">
            {personalData.name}.
          </h1>

          {/* Headline & Location Row */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-slate-400">
              {personalData.title}
            </h2>
            {personalData.address && (
              <>
                <span className="hidden md:block text-slate-600">/</span>
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <MapPin size={20} className="text-green-400" />
                  {personalData.address}
                </div>
              </>
            )}
          </div>

          <p className="max-w-xl text-lg text-slate-400 mb-8 leading-relaxed">
            {personalData.summary}
          </p>

          {/* Quick Contact Details */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 text-sm font-mono text-slate-400">
            {personalData.email && (
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-green-400" />
                {personalData.email}
              </div>
            )}
            {personalData.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-green-400" />
                {personalData.phone}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              className="px-8 py-3 bg-green-500 text-slate-900 font-mono font-bold rounded hover:bg-green-400 transition shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
            >
              {personalData.ctaPrimaryText || "View My Work"}
            </a>

            {personalData.email && (
              <a
                href={`mailto:${personalData.email}`}
                className="px-6 py-3 border border-green-500 text-green-400 font-mono font-bold rounded hover:bg-green-500/10 transition"
              >
                {personalData.ctaSecondaryText || "Contact Me"}
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default InformationSection;
