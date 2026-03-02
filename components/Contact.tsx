import React, { useState, useRef } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  message: "",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isLoading, setIsLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    let newErrors = { ...initialErrors };

    if (!form.name.trim()) {
      newErrors.name = "Пожалуйста, введите имя";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Пожалуйста, введите email";
      valid = false;
    } else if (!validateEmail(form.email.trim())) {
      newErrors.email = "Введите корректный email";
      valid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Пожалуйста, напишите сообщение";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsLoading(true);
      setFormStatus(null);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setFormStatus("success");
          setStatusMessage(result.message || "Спасибо! Мы свяжемся с вами");
          setForm(initialForm);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setFormStatus(null);
            setStatusMessage("");
          }, 3000);
        } else {
          let message = "";
          if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
            const fieldsErrors = { ...initialErrors };
            result.errors.forEach((err: { field: string, message: string }) => {
              if (err.field && fieldsErrors.hasOwnProperty(err.field)) {
                fieldsErrors[err.field as keyof typeof fieldsErrors] = err.message;
              }
            });
            setErrors(fieldsErrors);
            message = result.errors[0].message;
          } else {
            message = result.error || "Произошла ошибка отправки. Попробуйте позже.";
          }
          setFormStatus("error");
          setStatusMessage(message);

          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setFormStatus(null);
            setStatusMessage("");
          }, 3000);
        }
      } catch (err) {
        setFormStatus("error");
        setStatusMessage("Не удалось отправить форму, попробуйте позже.");
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setFormStatus(null);
          setStatusMessage("");
        }, 3000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container max-w-[520px] mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-9 tracking-tight">
          Свяжитесь с нами
        </h2>
        
        {/* Уведомление об успехе */}
        {formStatus === "success" && (
          <div className="bg-[#dafbe1] text-[#186540] rounded-xl py-3 px-5 mb-5 border border-[#b6e2c9] text-center font-medium">
            {statusMessage}
          </div>
        )}
        
        {/* Уведомление об ошибке */}
        {formStatus === "error" && (
          <div className="bg-[#fde8e4] text-[#c43c2c] rounded-xl py-3 px-5 mb-5 border border-[#f5c3bb] text-center font-medium">
            {statusMessage}
          </div>
        )}
        
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-xl p-8 shadow-[0_2px_16px_0_rgba(70,90,120,0.10)] flex flex-col gap-6"
        >
          {/* Поле Имя */}
          <div className="flex flex-col">
            <label htmlFor="contact-name" className="font-medium mb-1">
              Имя<span className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              disabled={isLoading}
              className={`px-4 py-3 rounded-xl border ${
                errors.name 
                  ? "border-red-500 outline-red-500" 
                  : "border-[#dde2eb]"
              } text-base bg-[#fafbff] transition-colors disabled:opacity-60`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name}
              </span>
            )}
          </div>

          {/* Поле Email */}
          <div className="flex flex-col">
            <label htmlFor="contact-email" className="font-medium mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              disabled={isLoading}
              className={`px-4 py-3 rounded-xl border ${
                errors.email 
                  ? "border-red-500 outline-red-500" 
                  : "border-[#dde2eb]"
              } text-base bg-[#fafbff] transition-colors disabled:opacity-60`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email}
              </span>
            )}
          </div>

          {/* Поле Сообщение */}
          <div className="flex flex-col">
            <label htmlFor="contact-message" className="font-medium mb-1">
              Сообщение<span className="text-red-500">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              disabled={isLoading}
              className={`px-4 py-3 rounded-xl border ${
                errors.message 
                  ? "border-red-500 outline-red-500" 
                  : "border-[#dde2eb]"
              } text-base bg-[#fafbff] transition-colors resize-y min-h-[110px] disabled:opacity-60`}
            />
            {errors.message && (
              <span className="text-red-500 text-sm mt-1">
                {errors.message}
              </span>
            )}
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={isLoading}
            className={`mt-1 py-3 px-0 rounded-xl text-white font-semibold text-lg border-none shadow-[0_1px_6px_rgba(70,90,120,0.08)] transition-colors flex items-center justify-center gap-3 ${
              isLoading 
                ? "bg-[#6278fa] cursor-not-allowed" 
                : "bg-[#3748fa] hover:bg-[#4a5bfa] cursor-pointer"
            }`}
          >
            {isLoading && (
              <span
                className="inline-block w-5 h-5 border-2 border-gray-100 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              />
            )}
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
      
      {/* Дополнительные стили для анимации спиннера */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin {
            animation: spin 0.9s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Contact;