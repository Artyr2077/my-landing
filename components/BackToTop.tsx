'use client';

import React, { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const btnClass =
    "fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10 transition-all";
  const circleClass =
    "flex items-center justify-center rounded-full bg-[var(--accent)] shadow-lg cursor-pointer" +
    " transition-transform duration-300 hover:scale-110 hover:bg-[var(--accent-light)] active:scale-95" +
    " focus:outline-none";
  const sizeClass = "w-12 h-12 md:w-16 md:h-16";

  return (
    <button
      onClick={scrollToTop}
      aria-label="Наверх"
      tabIndex={visible ? 0 : -1}
      className={`
        ${btnClass}
        ${circleClass}
        ${sizeClass}
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        transition-opacity duration-300
      `}
      style={{
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 md:w-8 md:h-8 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;