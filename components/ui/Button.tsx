'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const { theme } = useTheme();
  
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Стили для светлой темы
  const lightStyles = {
    primary: "bg-[#0B1C33] text-white hover:bg-[#1E3A6F]",
    secondary: "bg-[#C6A13B] text-white hover:bg-[#E5C76B]",
    outline: "border-2 border-[#0B1C33] text-[#0B1C33] hover:bg-[#0B1C33] hover:text-white",
    ghost: "text-[#0B1C33] hover:bg-[#F5F7FA] hover:text-[#C6A13B]",
  };

  // Стили для темной темы
  const darkStyles = {
    primary: "bg-white text-[#0B1C33] hover:bg-[#E5C76B] hover:text-white",
    secondary: "bg-[#E5C76B] text-[#0B1C33] hover:bg-[#C6A13B] hover:text-white",
    outline: "border-2 border-white text-white hover:bg-white hover:text-[#0B1C33]",
    ghost: "text-white hover:bg-[#1E2A3A] hover:text-[#E5C76B]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const shadowStyles = "shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)]";

  // Выбираем стили в зависимости от темы
  const themeStyles = theme === 'light' ? lightStyles[variant] : darkStyles[variant];

  const styles = `${baseStyles} ${themeStyles} ${shadowStyles} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
};

export default Button;