"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Главная", href: "#hero", id: "hero" },
  { label: "Услуги", href: "#services", id: "services" },
  { label: "Кейсы", href: "#cases", id: "cases" },
  { label: "Контакты", href: "#contact", id: "contact" },
];

const HEADER_HEIGHT = 64; // px, h-16 = 4*16 = 64px

function getOffsetTop(id: string) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  // window scrollY + element top - header height (with some extra padding)
  return (
    window.scrollY + rect.top - HEADER_HEIGHT - 10 // 10px extra space
  );
}

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");

  // Helper to handle smooth scroll with offset
  const handleNavClick = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setMenuOpen(false);

      if (id === "hero") {
        // If "Главная", scroll to very top or #hero
        const heroEl = document.getElementById("hero") ?? document.body;
        // (use getOffsetTop for #hero section if exists, fallback to top)
        if (heroEl.id === "hero") {
          window.scrollTo({
            top: getOffsetTop("hero"),
            behavior: "smooth",
          });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // Scroll to specific section minus header
        window.scrollTo({
          top: getOffsetTop(id),
          behavior: "smooth",
        });
      }
    },
    []
  );

  // Active menu highlighting on scroll
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(item => item.id);
    const handleScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const sectionTop =
            el.getBoundingClientRect().top - HEADER_HEIGHT - 20; // 20px padding
          if (sectionTop <= 0) {
            current = id;
          }
        }
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50 transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-extrabold text-2xl text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
          onClick={handleNavClick("hero")}
        >
          WebStudio
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              onClick={handleNavClick(id)}
              className={`text-gray-700 hover:text-blue-600 transition-colors py-2 px-3 rounded hover:bg-blue-50 hover:shadow ${
                activeId === id
                  ? "text-blue-700 font-bold bg-blue-50 shadow"
                  : ""
              }`}
              aria-current={activeId === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Burger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center h-10 w-10 rounded hover:bg-blue-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Открыть меню"
        >
          <div
            className={`h-0.5 w-6 bg-blue-700 mb-1.5 transform transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <div
            className={`h-0.5 w-6 bg-blue-700 mb-1.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <div
            className={`h-0.5 w-6 bg-blue-700 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md transition-transform duration-300 ease-in-out z-40 ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center py-4 space-y-4">
          {NAV_ITEMS.map(({ label, href, id }) => (
            <a
              key={href}
              href={href}
              onClick={handleNavClick(id)}
              className={`w-full text-center text-lg text-gray-700 hover:text-blue-600 transition-colors py-2 rounded hover:bg-blue-50 ${
                activeId === id
                  ? "text-blue-700 font-bold bg-blue-50"
                  : ""
              }`}
              aria-current={activeId === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
      {/* Spacer: to push content below header */}
      <style>{`
        /* Add a spacer under the header for fixed height */
        body > div:first-child {
          padding-top: ${HEADER_HEIGHT + 6}px !important;
        }
      `}</style>
    </header>
  );
};

export default Header;