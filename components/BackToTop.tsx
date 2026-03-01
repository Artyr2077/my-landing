import React, { useEffect, useState } from "react";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  // Появляется после 300px прокрутки
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Начальное состояние
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Скролл наверх
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Размер на мобилке
  const btnClass =
    "fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10 transition-all";
  const circleClass =
    "flex items-center justify-center rounded-full bg-blue-600 shadow-lg cursor-pointer" +
    " transition-transform duration-300 hover:scale-110 hover:bg-blue-700 active:scale-95 active:bg-blue-800" +
    " focus:outline-none";
  const sizeClass =
    "w-12 h-12 md:w-16 md:h-16"; // Мобилка меньше

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
        // Анимация появления/исчезновения + маленький лифт эффект
        transform: visible
          ? "translateY(0)"
          : "translateY(20px)",
        transition: "opacity 0.3s, transform 0.3s",
      }}
    >
      {/* Heroicons Up Arrow Outline SVG */}
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