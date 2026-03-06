'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useToast } from "./ToastContext";
import { LoadingIcon } from "./ui/Icons";
import { validateContactForm } from "@/lib/validation";

const initialForm = { name: "", email: "", message: "" };
const initialErrors = { name: "", email: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(form);
    if (validationErrors.length > 0) {
      const newErrors = { ...initialErrors };
      validationErrors.forEach((err: any) => {
        newErrors[err.field as keyof typeof newErrors] = err.message;
      });
      setErrors(newErrors);
      showToast('error', 'Пожалуйста, исправьте ошибки в форме');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        showToast('success', result.message || 'Спасибо! Мы свяжемся с вами');
        setForm(initialForm);
      } else {
        showToast('error', result.error || 'Произошла ошибка отправки');
      }
    } catch {
      showToast('error', 'Не удалось отправить форму, попробуйте позже');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[var(--muted)]" ref={ref} id="contact">
      <div className="container max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-center mb-4 text-[var(--foreground)]">
            Обсудим <span className="text-[var(--accent)]">проект?</span>
          </h2>
          <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в ближайшее время, чтобы обсудить детали
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[var(--background)] rounded-3xl p-8 md:p-10 shadow-[var(--shadow-md)] space-y-6 border border-[var(--border)]"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Имя <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-5 py-3 rounded-xl border ${
                  errors.name ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition disabled:opacity-60`}
                placeholder="Александр"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-5 py-3 rounded-xl border ${
                  errors.email ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition disabled:opacity-60`}
                placeholder="hello@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Сообщение <span className="text-[var(--accent)]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-5 py-3 rounded-xl border ${
                  errors.message ? 'border-red-500' : 'border-[var(--border)]'
                } bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition resize-none disabled:opacity-60`}
                placeholder="Расскажите о вашей идее..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--accent)] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[var(--accent-light)] hover:shadow-lg transform hover:-translate-y-0.5 text-lg"
            >
              {isLoading && <LoadingIcon className="w-5 h-5 animate-spin text-white" />}
              {isLoading ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;