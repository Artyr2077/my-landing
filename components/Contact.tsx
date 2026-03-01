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
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  // Новые состояния
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
      setFormStatus(null); // clear any previous status
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setFormStatus("success");
          setStatusMessage(result.message || "Спасибо! Мы свяжемся с вами");
          setForm(initialForm);

          // очистить статус через 3 сек
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setFormStatus(null);
            setStatusMessage("");
          }, 3000);
        } else {
          let message = "";
          if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
            // Показываем только первую ошибку для простоты
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

          // Убираем ошибку через 3 сек (можно оставить дольше)
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
    <section className="contact-section" style={{ padding: "3rem 0", background: "#f0f2fa" }}>
      <div className="container" style={{ maxWidth: 520, margin: "0 auto", padding: "0 1rem" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.25rem",
            fontWeight: 700,
            marginBottom: "2.25rem",
            letterSpacing: "-1px",
          }}
        >
          Свяжитесь с нами
        </h2>
        {/* Уведомление об успехе/ошибке */}
        {formStatus === "success" && (
          <div
            style={{
              background: "#dafbe1",
              color: "#186540",
              borderRadius: ".75rem",
              padding: ".85rem 1.2rem",
              marginBottom: "1.25rem",
              border: "1px solid #b6e2c9",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {statusMessage}
          </div>
        )}
        {formStatus === "error" && (
          <div
            style={{
              background: "#fde8e4",
              color: "#c43c2c",
              borderRadius: ".75rem",
              padding: ".85rem 1.2rem",
              marginBottom: "1.25rem",
              border: "1px solid #f5c3bb",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {statusMessage}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{
            background: "#fff",
            borderRadius: "1.25rem",
            padding: "2rem",
            boxShadow: "0 2px 16px 0 rgba(70, 90, 120, .10)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="contact-name" style={{ fontWeight: 500, marginBottom: ".25rem" }}>
              Имя<span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              autoComplete="off"
              style={{
                padding: ".75rem 1rem",
                borderRadius: ".75rem",
                border: errors.name ? "1.5px solid #e74c3c" : "1.5px solid #dde2eb",
                fontSize: "1rem",
                outline: errors.name ? "#e74c3c auto 1px" : undefined,
                background: "#fafbff",
                transition: "border-color .2s"
              }}
              disabled={isLoading}
            />
            {errors.name && (
              <span style={{ color: "#e74c3c", fontSize: ".92rem", marginTop: ".25rem" }}>
                {errors.name}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="contact-email" style={{ fontWeight: 500, marginBottom: ".25rem" }}>
              Email<span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="off"
              style={{
                padding: ".75rem 1rem",
                borderRadius: ".75rem",
                border: errors.email ? "1.5px solid #e74c3c" : "1.5px solid #dde2eb",
                fontSize: "1rem",
                outline: errors.email ? "#e74c3c auto 1px" : undefined,
                background: "#fafbff",
                transition: "border-color .2s"
              }}
              disabled={isLoading}
            />
            {errors.email && (
              <span style={{ color: "#e74c3c", fontSize: ".92rem", marginTop: ".25rem" }}>
                {errors.email}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="contact-message" style={{ fontWeight: 500, marginBottom: ".25rem" }}>
              Сообщение<span style={{ color: "#e74c3c" }}>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              style={{
                padding: ".9rem 1rem",
                borderRadius: ".75rem",
                border: errors.message ? "1.5px solid #e74c3c" : "1.5px solid #dde2eb",
                fontSize: "1rem",
                background: "#fafbff",
                outline: errors.message ? "#e74c3c auto 1px" : undefined,
                resize: "vertical",
                minHeight: "110px",
                transition: "border-color .2s"
              }}
              disabled={isLoading}
            />
            {errors.message && (
              <span style={{ color: "#e74c3c", fontSize: ".92rem", marginTop: ".25rem" }}>
                {errors.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: ".25rem",
              padding: "0.9rem 0",
              borderRadius: ".75rem",
              color: "#fff",
              background: isLoading ? "#6278fa" : "#3748fa",
              fontWeight: 600,
              fontSize: "1.17rem",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              boxShadow: "0 1px 6px rgba(70, 90, 120, .08)",
              transition: "background .2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".7rem"
            }}
          >
            {isLoading && (
              <span
                className="spinner"
                style={{
                  width: "1.2em",
                  height: "1.2em",
                  border: "2px solid #f3f3f3",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.9s linear infinite"
                }}
                aria-hidden="true"
              />
            )}
            {isLoading ? "Отправка..." : "Отправить"}
          </button>
        </form>
      </div>
      <style>
        {`
          @media (max-width: 600px) {
            .contact-section form {
              padding: 1rem !important;
            }
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </section>
  );
};

export default Contact;