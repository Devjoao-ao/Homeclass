"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#servicos", label: "Serviços" },
  { href: "#formulario", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Prevent scroll when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 relative z-[60]" aria-label="Homeclaz — página inicial">
          <img 
            src="/logo.png" 
            alt="Homeclaz Logo" 
            className="h-16 sm:h-20 w-auto object-contain transition-all hover:scale-105" 
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors duration-150"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#formulario"
            className="inline-flex items-center gap-2 bg-secondary text-slate-900 text-sm font-bold px-6 py-3 rounded-xl hover:bg-secondary-500 transition-all duration-150 shadow-md shadow-secondary/10"
          >
            Solicitar Profissional
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden relative z-[60] w-12 h-12 flex items-center justify-center text-slate-900 bg-slate-50 rounded-xl"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </nav>

      {/* Full-screen Mobile Menu */}
      <div
        id="mobile-menu"
        className={clsx(
          "fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-10"
        )}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col items-center gap-10" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className={clsx("transition-all duration-700 delay-100", mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-90")}>
              <a
                href={href}
                onClick={() => setMobileOpen(false)}
                className="text-4xl font-black text-slate-900 hover:text-primary transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
          <li className={clsx("pt-10 transition-all duration-700 delay-300", mobileOpen ? "opacity-100 scale-100" : "opacity-0 scale-90")}>
            <a
              href="#formulario"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center bg-secondary text-slate-900 text-xl font-black px-12 py-5 rounded-3xl shadow-xl"
            >
              Solicitar Profissional
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
