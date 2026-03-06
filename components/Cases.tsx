'use client';

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "./ui/Modal";
import { ArrowRightIcon } from "./ui/Icons";

const cases = [
  {
    id: 1,
    title: "Бутик Fashion",
    category: "Интернет-магазин",
    description: "Разработка премиального e-commerce с фокусом на визуал и скорость.",
    fullDescription: "Для бутика премиальной одежды мы создали сайт, который отражает атмосферу luxury-шопинга. Крупные изображения, микро-анимации и путь к покупке в 2 клика увеличили конверсию на 40%.",
    image: "/photos/shop.jpg",
    alt: "Fashion shop",
    technologies: ["Next.js", "Tailwind", "Medusa", "Framer Motion"],
    results: "Конверсия +40%, Время на сайте +2 мин"
  },
  {
    id: 2,
    title: "ЛогистикХаб",
    category: "CRM система",
    description: "Автоматизация складских процессов и управление заказами.",
    fullDescription: "Разработали кастомную CRM для управления складом, отслеживания поставок и автоматизации отчетности. Система сократила время обработки заказов на 60%.",
    image: "/photos/crm.png",
    alt: "CRM склад",
    technologies: ["React", "Node.js", "PostgreSQL", "WebSocket"],
    results: "Обработка заказов -60%, Ошибки -90%"
  },
];

const Cases = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCase, setSelectedCase] = useState<typeof cases[0] | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <>
      <section className="py-24 bg-[var(--background)]" ref={ref}>
        <div className="container max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-serif font-semibold text-center mb-16 text-[var(--foreground)]"
          >
            Избранные <span className="text-[var(--accent)]">проекты</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {cases.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group relative rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-500 bg-[var(--background)] cursor-pointer"
                onClick={() => setSelectedCase(project)}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                {/* Информация, видимая всегда (но скрывается при наведении) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-sm text-[var(--accent)]">{project.category}</span>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{project.title}</h3>
                </div>

                {/* Оверлей при наведении - теперь полностью перекрывает карточку */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/95 via-[var(--primary)]/80 to-[var(--primary)]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <div className="text-white w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-sm font-medium text-[var(--accent)] uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-serif font-semibold mb-2">{project.title}</h3>
                    <p className="text-white/90 mb-3 line-clamp-2">{project.description}</p>
                    
                    {/* Технологии */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Результаты */}
                    <div className="text-sm text-[var(--accent)] font-medium mb-4">
                      {project.results}
                    </div>
                    
                    <button
                      className="inline-flex items-center gap-2 text-sm font-medium bg-[var(--accent)] px-4 py-2 rounded-lg hover:bg-[var(--accent-light)] transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCase(project);
                      }}
                    >
                      Смотреть проект <ArrowRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Модальное окно */}
      <Modal
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        title={selectedCase?.title}
        size="lg"
      >
        {selectedCase && (
          <div className="space-y-6">
            <img
              src={selectedCase.image}
              alt={selectedCase.alt}
              className="w-full rounded-xl"
            />
            
            <div className="space-y-4">
              <p className="text-[var(--foreground)] leading-relaxed">
                {selectedCase.fullDescription}
              </p>
              
              <div>
                <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Технологии:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCase.technologies.map((tech, i) => (
                    <span key={i} className="text-sm bg-[var(--muted)] px-3 py-1 rounded-full text-[var(--foreground)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-[var(--muted-foreground)] mb-2">Результаты:</h4>
                <p className="text-[var(--accent)] font-medium">{selectedCase.results}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Cases;