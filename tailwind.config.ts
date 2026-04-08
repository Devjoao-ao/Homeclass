import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#054be5",
          50:  "#eff4ff",
          100: "#dbe6fe",
          200: "#bed1fe",
          300: "#90b2fd",
          400: "#5a88fa",
          500: "#3460f6",
          600: "#1d3eeb",
          700: "#054be5",
          800: "#1832b9",
          900: "#1a2f91",
          950: "#141e57",
        },
        secondary: {
          DEFAULT: "#FACC15",
          50:  "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#FACC15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        slate: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "cta":     "0 8px 32px rgba(250,204,21,0.35)",
        "card":    "0 2px 16px rgba(5,75,229,0.08)",
        "card-lg": "0 8px 40px rgba(5,75,229,0.12)",
      },
      animation: {
        "fade-in":    "fadeIn 0.5s ease-out both",
        "slide-up":   "slideUp 0.5s ease-out both",
        "check-draw": "checkDraw 0.6s ease-out 0.2s both",
        "scale-in":   "scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        checkDraw: {
          "0%":   { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
        scaleIn: {
          "0%":   { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
