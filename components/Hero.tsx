'use client';

import React from "react";
import Button from "./ui/Button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="w-full bg-gradient-to-br from-[var(--muted)] to-[var(--background)] py-20 md:py-32 relative overflow-hidden">
      {/* Декоративный элемент */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto px-5 flex flex-col items-center text-center relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight text-[var(--foreground)]">
          Создаем цифровые <br />
          <span className="text-[var(--accent)]">продукты с душой</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-[var(--muted-foreground)] mb-10 max-w-2xl">
          Разрабатываем современные веб-решения, которые помогают бизнесу расти и выделяться на фоне конкурентов
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="#cases" variant="primary" size="lg">
            Смотреть работы
          </Button>
          <Button href="#contact" variant="outline" size="lg">
            Связаться
          </Button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div>
            <div className="text-3xl font-serif font-bold text-[var(--accent)]">200+</div>
            <div className="text-sm text-[var(--muted-foreground)]">проектов</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[var(--accent)]">10+</div>
            <div className="text-sm text-[var(--muted-foreground)]">лет опыта</div>
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-[var(--accent)]">5 ★</div>
            <div className="text-sm text-[var(--muted-foreground)]">рейтинг</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;