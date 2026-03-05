'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        router.push("/admin/leads");
      } else {
        setErrorMsg(data.message || "Неверный пароль");
      }
    } catch (err) {
      setErrorMsg("Ошибка входа. Попробуйте ещё раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-[var(--shadow-lg)] max-w-md w-full p-8">
        <h2 className="text-3xl font-serif font-semibold text-center mb-8 text-[var(--foreground)]">
          Вход в <span className="text-[var(--accent)]">админку</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)] mb-2">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition disabled:opacity-60"
              placeholder="Введите пароль"
              autoFocus
              required
            />
          </div>

          {errorMsg && (
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;