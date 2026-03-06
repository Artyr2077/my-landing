'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";
import Loader from "@/components/Loader";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Проверяем, находится ли пользователь в админке
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <ToastProvider>
            {loading && <Loader />}
            {/* Показываем Header на всех страницах, кроме админки */}
            {!isAdminPage && <Header />}
            {/* Основной контент */}
            <main className={!isAdminPage ? "" : ""}>
              {children}
            </main>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}