'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WebsiteIcon, BotIcon, AppIcon } from "./ui/Icons";

const services = [
  {
    icon: WebsiteIcon,
    title: "Корпоративные сайты",
    description: "Разработка многостраничных сайтов и премиальных лендингов, которые отражают ценности вашего бренда.",
  },
  {
    icon: BotIcon,
    title: "Telegram-боты",
    description: "Создание умных ботов для автоматизации продаж, поддержки и сбора лидов 24/7.",
  },
  {
    icon: AppIcon,
    title: "Веб-приложения",
    description: "Сложные веб-сервисы, CRM-системы и личные кабинеты с безупречным UX.",
  },
];

const Services = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
  };

  return (
    <section className="py-24 bg-[var(--muted)]" ref={ref}>
      <div className="container max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-serif font-semibold text-center mb-16 text-[var(--foreground)]"
        >
          Наши <span className="text-[var(--accent)]">компетенции</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-[var(--background)] rounded-2xl p-8 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center group-hover:bg-[var(--accent)] transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-[var(--accent)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-3 text-[var(--foreground)]">{service.title}</h3>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;