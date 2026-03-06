"use client";

import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Cases from "@/components/Cases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
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
      <BackToTop />
    </div>
  );
}