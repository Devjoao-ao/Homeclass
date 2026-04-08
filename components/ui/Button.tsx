"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary select-none cursor-pointer";

    const variants = {
      primary:
        "bg-primary text-white hover:bg-primary-600 active:scale-[0.98] shadow-md hover:shadow-lg focus-visible:outline-primary",
      secondary:
        "bg-secondary text-slate-900 hover:bg-secondary-500 active:scale-[0.98] shadow-cta hover:shadow-[0_8px_32px_rgba(250,204,21,0.5)] focus-visible:outline-secondary",
      ghost:
        "bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-white active:scale-[0.98] focus-visible:outline-primary",
      danger:
        "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] focus-visible:outline-red-600",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const disabledStyle =
      "opacity-50 cursor-not-allowed pointer-events-none";

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={clsx(
          base,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          (disabled || loading) && disabledStyle,
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
