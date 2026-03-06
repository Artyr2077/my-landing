'use client';

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import Button from "./ui/Button";

const NAV_ITEMS = [
  { label: "Главная", href: "/", id: "hero" },
  { label: "Услуги", href: "/#services", id: "services" },
  { label: "Кейсы", href: "/#cases", id: "cases" },
  { label: "Контакты", href: "/#contact", id: "contact" },
  { label: "Блог", href: "/blog", id: "blog" },
  { label: "О нас", href: "/about", id: "about" },
];

const HEADER_HEIGHT = 72;

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Отслеживаем скролл для изменения хэша
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Определяем активную секцию при скролле
      if (pathname === '/') {
        const sections = NAV_ITEMS.filter(item => item.href.startsWith('/#')).map(item => item.id);
        let current = "";
        for (const id of sections) {
          const element = document.getElementById(id);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= HEADER_HEIGHT + 50 && rect.bottom >= HEADER_HEIGHT + 50) {
              current = id;
              break;
            }
          }
        }
        setActiveHash(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '/') {
      // Для главной просто скроллим наверх
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push('/', { scroll: false });
    } else if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      if (pathname === '/') {
        // Мы на главной - скроллим к секции
        const element = document.getElementById(id);
        if (element) {
          const offset = element.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      } else {
        // Мы не на главной - переходим на главную с хэшем
        router.push(href);
      }
    } else {
      // Обычная навигация на другую страницу
      router.push(href);
    }
    
    setMenuOpen(false);
  }, [pathname, router]);

  // Функция для определения активного пункта меню
  const isActive = (href: string) => {
    if (href === '/') {
      // Главная активна только когда мы на главной И нет активного хэша
      return pathname === '/' && !activeHash;
    }
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      // Для якорных ссылок проверяем, что мы на главной и хэш совпадает с активной секцией
      return pathname === '/' && activeHash === id;
    }
    return pathname === href;
  };

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300
          ${scrolled 
            ? 'bg-[var(--background)]/80 backdrop-blur-lg shadow-[var(--shadow-sm)] border-b border-[var(--border)]' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="container max-w-7xl mx-auto px-4 flex h-[72px] items-center justify-between">
          {/* Логотип */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="font-serif text-2xl font-semibold tracking-tight hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            Web<span className="text-[var(--accent)]">Studio</span>
          </a>

          {/* Десктопное меню */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  hover:bg-[var(--muted)] hover:text-[var(--accent)]
                  ${isActive(href) 
                    ? 'text-[var(--accent)] bg-[var(--muted)]' 
                    : 'text-[var(--foreground)]'
                  }
                `}
              >
                {label}
              </a>
            ))}
            {/* Кнопка "Начать проект" в десктопном меню */}
            <Button href="/#contact" variant="secondary" size="sm" className="ml-4">
              Начать проект
            </Button>
          </nav>


          {/* Правая часть: кнопка темы и бургер */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Кнопка бургер-меню */}
            <button
              className="md:hidden relative w-10 h-10 rounded-lg hover:bg-[var(--muted)] transition-colors focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Меню"
            >
              <span className="sr-only">Открыть меню</span>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5">
                <span
                  className={`
                    absolute h-0.5 w-5 bg-[var(--foreground)] transform transition-all duration-300
                    ${menuOpen ? 'rotate-45 top-0' : '-top-1.5'}
                  `}
                />
                <span
                  className={`
                    absolute h-0.5 w-5 bg-[var(--foreground)] transform transition-all duration-300
                    ${menuOpen ? 'opacity-0' : 'top-0'}
                  `}
                />
                <span
                  className={`
                    absolute h-0.5 w-5 bg-[var(--foreground)] transform transition-all duration-300
                    ${menuOpen ? '-rotate-45 top-0' : 'top-1.5'}
                  `}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div
        className={`
          fixed inset-0 z-40 bg-[var(--background)]/95 backdrop-blur-lg md:hidden
          transition-all duration-300 ease-in-out
          ${menuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
          }
        `}
        style={{ top: HEADER_HEIGHT }}
      >
        <nav className="container mx-auto px-4 py-8 flex flex-col space-y-2">
          {NAV_ITEMS.map(({ label, href }, index) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`
                py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300
                hover:bg-[var(--muted)] hover:text-[var(--accent)] hover:translate-x-2
                ${isActive(href)
                  ? 'text-[var(--accent)] bg-[var(--muted)]' 
                  : 'text-[var(--foreground)]'
                }
              `}
              style={{
                transitionDelay: menuOpen ? `${index * 50}ms` : '0ms',
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {label}
            </a>
          ))}
          {/* Кнопка в мобильном меню */}
          <div className="pt-4" style={{
            transitionDelay: menuOpen ? `${NAV_ITEMS.length * 50}ms` : '0ms',
            transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
            opacity: menuOpen ? 1 : 0,
            transition: 'all 0.3s ease-out',
          }}>
            <Button href="/#contact" variant="secondary" size="lg" className="w-full">
              Начать проект
            </Button>
          </div>
        </nav>
      </div>

      {/* Отступ для контента */}
      <style jsx>{`
        :global(body) {
          padding-top: ${HEADER_HEIGHT}px;
        }
      `}</style>
    </>
  );
};

export default Header;