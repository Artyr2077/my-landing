'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

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
    <div className="login-root">
      <div className="login-card">
        <h2 className="login-title">Вход в админку</h2>
        <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
          <label htmlFor="admin-password" className="login-label">
            Пароль
          </label>
          <input
            id="admin-password"
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            autoFocus
            required
          />
          {errorMsg && (
            <div className="login-error">{errorMsg}</div>
          )}
          <button
            type="submit"
            className="login-button"
            disabled={isLoading || password.length === 0}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
      <style>{`
        .login-root {
          min-height: 100vh;
          background: linear-gradient(120deg,#f0f4fe 0%, #c3dbfc 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-card {
          background: #fff;
          max-width: 400px;
          width: 100%;
          padding: 2.2rem 2rem 2.4rem 2rem;
          border-radius: 1.25rem;
          box-shadow: 0 2px 32px rgba(46,60,110,0.12);
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .login-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 700;
          color: #3748fa;
          letter-spacing: -1px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.12rem;
        }
        .login-label {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.32rem;
        }
        .login-input {
          padding: 0.9rem 1rem;
          border-radius: 0.7rem;
          border: 1.5px solid #dde2eb;
          background: #f6f8fe;
          font-size: 1.09rem;
          outline: none;
          transition: border-color .19s;
        }
        .login-input:focus {
          border-color: #6278fa;
          background: #fff;
        }
        .login-error {
          color: #d52e2e;
          background: #fde8e4;
          border: 1px solid #f5c3bb;
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          font-weight: 500;
          font-size: 1rem;
          margin-bottom: 0.2rem;
          text-align: center;
          animation: shake 0.28s;
        }
        .login-button {
          margin-top: 0.3rem;
          padding: 0.8rem 0;
          font-size: 1.12rem;
          border: none;
          border-radius: 0.7rem;
          font-weight: 600;
          background: #3748fa;
          color: #fff;
          cursor: pointer;
          box-shadow: 0 1px 10px rgba(70, 90, 120, 0.06);
          transition: background .21s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .login-button:disabled {
          background: #bcd0fa;
          cursor: not-allowed;
        }
        @media (max-width: 600px) {
          .login-card {
            max-width: 97vw;
            padding: 1.2rem 0.9rem 1.6rem 0.9rem;
          }
          .login-title {
            font-size: 1.35rem;
          }
        }
        @keyframes shake {
          0% { transform: translateX(0); }
          30% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
