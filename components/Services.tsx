'use client';

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: "🌐",
    title: "Сайты",
    description: "Разработка корпоративных сайтов и лендингов",
  },
  {
    icon: "🤖",
    title: "Боты",
    description: "Создание Telegram-ботов для автоматизации",
  },
  {
    icon: "📱",
    title: "Веб-приложения",
    description: "Сложные веб-сервисы и CRM-системы",
  },
];

const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth <= 700;

const Services = () => {
  // Анимация появления карточки при скролле
  // Массив refs и inView для каждой карточки
  const cardRefs: React.MutableRefObject<(HTMLElement | null)[]> = React.useRef([] as (HTMLElement | null)[]);

  // Для эффектов наведения
  const handleMouseEnter = (idx: number) => {
    if (typeof window !== "undefined" && isMobile()) return;
    const card = cardRefs.current[idx] as HTMLDivElement | null;
    const icon = card?.querySelector(".service-icon") as HTMLDivElement | null;
    if (card) {
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 14px 32px 0 rgba(60,60,120,0.20)";
    }
    if (icon) {
      icon.style.transform = "scale(1.1)";
    }
  };

  const handleMouseLeave = (idx: number) => {
    if (typeof window !== "undefined" && isMobile()) return;
    const card = cardRefs.current[idx] as HTMLDivElement | null;
    const icon = card?.querySelector(".service-icon") as HTMLDivElement | null;
    if (card) {
      card.style.transform = "";
      card.style.boxShadow = "";
    }
    if (icon) {
      icon.style.transform = "";
    }
  };

  return (
    <section
      className="services-section"
      style={{ padding: "3rem 0", background: "#f8f9fa" }}
    >
      <div
        className="container"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1rem" }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            marginBottom: "2.5rem",
            fontWeight: 700,
            letterSpacing: "-1px",
          }}
        >
          Наши услуги
        </h2>
        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {services.map((service, idx) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.2,
            });
            // Комбинируем внутренний ref библиотеки с массивом refs для наведения
            const setRefs = (el: HTMLElement | null) => {
              cardRefs.current[idx] = el;
              ref(el);
            };
            return (
              <motion.div
                key={idx}
                className="service-card"
                ref={setRefs}
                initial={{ opacity: 0, y: 34 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
                transition={{ duration: 0.5, ease: [.4, 0, .2, 1], delay: idx * 0.10 }}
                style={{
                  background: "#fff",
                  borderRadius: "1.25rem",
                  boxShadow: "0 2px 16px 0 rgba(70, 90, 120, .10)",
                  padding: "2.5rem 2rem",
                  textAlign: "center",
                  transition:
                    "transform 0.23s cubic-bezier(.4,0,.2,1), box-shadow 0.23s cubic-bezier(.4,0,.2,1)",
                  cursor: "pointer",
                  willChange: "transform, box-shadow",
                }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <div
                  className="service-icon"
                  style={{
                    fontSize: "2.5rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    width: "3.5rem",
                    height: "3.5rem",
                    background: "#f0f2fa",
                    margin: "0 auto 1rem",
                    transition:
                      "transform 0.19s cubic-bezier(.4,0,.2,1) /* иконка плавно увеличивается */",
                    willChange: "transform",
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    marginBottom: "0.75rem",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#444e62",
                    lineHeight: 1.6,
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
      <style>
        {`
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
        /* Smoother big effects only на десктопе, на мобилке - проще */
        @media (hover: hover) and (pointer: fine) {
          .service-card:hover {
            /* JS-дублирование, для SSR -- вторично */
            /* Дополнительно для плавности: */
            /* transform: translateY(-8px); */
            /* box-shadow: 0 14px 32px 0 rgba(60,60,120,0.20); */
          }
          .service-card:hover .service-icon {
            /* transform: scale(1.1); */
          }
        }
        @media (max-width: 700px) {
          .service-card,
          .service-icon {
            transition: transform 0.12s cubic-bezier(.4,0,.2,1), box-shadow 0.12s cubic-bezier(.4,0,.2,1);
          }
        }
        `}
      </style>
    </section>
  );
};

export default Services;