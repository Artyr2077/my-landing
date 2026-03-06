'use client';

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0B1C33] text-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">
              Web<span className="text-[#C6A13B]">Studio</span>
            </h3>
            <p className="text-white/70 text-sm">
              Создаем цифровые продукты с душой и вниманием к деталям.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Навигация</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link href="/" className="hover:text-[#C6A13B] transition-colors">Главная</Link></li>
              <li><Link href="/#services" className="hover:text-[#C6A13B] transition-colors">Услуги</Link></li>
              <li><Link href="/#cases" className="hover:text-[#C6A13B] transition-colors">Кейсы</Link></li>
              <li><Link href="/blog" className="hover:text-[#C6A13B] transition-colors">Блог</Link></li>
              <li><Link href="/about" className="hover:text-[#C6A13B] transition-colors">О нас</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Соцсети</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-[#C6A13B] transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-[#C6A13B] transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-[#C6A13B] transition-colors">LinkedIn</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white">Контакты</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>hello@webstudio.com</li>
              <li>+7 (999) 123-45-67</li>
              <li>Москва, ул. Тверская, 15</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 text-center text-sm text-white/50">
          © {new Date().getFullYear()} WebStudio. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;