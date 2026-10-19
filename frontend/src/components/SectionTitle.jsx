import React, { useState, useEffect, useRef } from "react";

const SectionTitle = ({ children, prompt = "root@eslam:~$" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const text = String(children || "");

  useEffect(() => {
    const node = elementRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  useEffect(() => {
    setDisplayedText("");
  }, [text]);

  useEffect(() => {
    if (isVisible && displayedText.length < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 75);

      return () => clearTimeout(timeoutId);
    }
  }, [isVisible, displayedText, text]);

  return (
    <div ref={elementRef} className="mb-8">
      <h2 className="font-mono font-bold text-green-600 dark:text-green-400 flex flex-wrap items-center">
        <span className="text-purple-600 dark:text-purple-500 mr-2 whitespace-nowrap text-lg md:text-2xl">
          {prompt}
        </span>

        <span className="text-lg md:text-2xl break-all">
          {displayedText}
          <span
            className="ml-1 animate-pulse text-green-600 dark:text-green-500 font-black inline-block"
            style={{ animationDuration: "0.75s" }}
          >
            _
          </span>
        </span>
      </h2>
    </div>
  );
};

export default SectionTitle;
