"use client";

import React, { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop"; // Добавляем BackToTop

const scrollToSection = (e: Event) => {
  const target = e.target as HTMLAnchorElement;
  if (
    target.tagName === "A" &&
    target.hash &&
    document.getElementById(target.hash.substring(1))
  ) {
    e.preventDefault();
    const el = document.getElementById(target.hash.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default function Home() {
  useEffect(() => {
    const menu = document.querySelector("header nav");
    if (!menu) return;
    menu.addEventListener("click", scrollToSection);
    return () => {
      menu.removeEventListener("click", scrollToSection);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f7faff" }}>
      <Header />
      <main>
        <Hero />
        <section id="services">
          <Services />
        </section>
        <section id="cases">
          <Cases />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <BackToTop /> {/* Кнопка появится в правом нижнем углу */}
      <style>{`
        .back-to-top-fixed {
          position: fixed;
          right: 2rem;
          bottom: 2rem;
          z-index: 50;
        }
      `}</style>
    </div>
  );
}