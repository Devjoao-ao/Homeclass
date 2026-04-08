"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check for local admin
    if (password === "homeclaz2024") {
      localStorage.setItem("homeclaz_admin", "true");
      window.location.href = "/admin";
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      <Navbar />
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full -ml-16 -mb-16" />
        
        <header className="mb-8 text-center relative z-10">
          <h1 className="text-3xl font-black tracking-tight">Login Admin</h1>
          <p className="text-slate-400 text-sm mt-2 font-medium">Área restrita à gerência Homeclaz Angola</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Palavra-passe</label>
            <input 
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-600 transition-all"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-bold animate-bounce text-center">
              Acesso negado. Palavra-passe incorrecta.
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-secondary text-slate-900 font-black text-lg py-5 rounded-2xl hover:bg-secondary-500 hover:scale-[1.02] transition-all shadow-xl shadow-secondary/20"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
      
      <div className="mt-8 text-slate-500 text-[10px] font-bold tracking-widest uppercase opacity-50">
        Homeclaz © 2024 — Todos os direitos reservados
      </div>
    </div>
  );
}
