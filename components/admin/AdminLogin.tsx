"use client";

import { useState, useId } from "react";
import clsx from "clsx";

interface AdminLoginProps {
  onLogin: () => void;
}

const DEMO_USER = "admin@homeclaz.ao";
const DEMO_PASS = "homeclaz2025";

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-150 min-h-[44px]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (email.trim() === DEMO_USER && password === DEMO_PASS) {
      onLogin();
    } else {
      setLoading(false);
      setError("Credenciais inválidas. Verifique e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-lg font-extrabold text-slate-900">
              Home<span className="text-primary">claz</span>
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">Área restrita</h1>
          <p className="text-sm text-slate-500 mt-1">Acesso apenas para administradores</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">

          {/* Demo hint */}
          <div className="mb-5 bg-slate-50 rounded-lg p-3 text-xs text-slate-500 border border-slate-100">
            <span className="font-semibold text-slate-700">Demo: </span>
            {DEMO_USER} / {DEMO_PASS}
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor={`${uid}-email`} className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <input
                id={`${uid}-email`} type="email" autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@homeclaz.ao"
                className={clsx(inputClass, error && "border-red-400")}
              />
            </div>

            <div>
              <label htmlFor={`${uid}-pass`} className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id={`${uid}-pass`} type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={clsx(inputClass, "pr-10", error && "border-red-400")}
                />
                <button
                  type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                  aria-label={showPass ? "Esconder" : "Mostrar"}
                >
                  {showPass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary text-white font-semibold text-sm py-3 rounded-xl hover:bg-primary-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  A verificar…
                </>
              ) : "Entrar"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-5">
          Homeclaz · Painel Administrativo · Acesso restrito
        </p>
      </div>
    </div>
  );
}
