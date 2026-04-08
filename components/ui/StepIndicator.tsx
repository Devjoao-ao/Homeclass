"use client";

import clsx from "clsx";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function StepIndicator({
  currentStep,
  totalSteps,
  labels = [],
}: StepIndicatorProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden mb-6">
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full progress-fill"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Etapa ${currentStep} de ${totalSteps}`}
        />
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex flex-col items-center gap-1.5">
              <div
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                  isCompleted &&
                    "bg-primary text-white shadow-md",
                  isCurrent &&
                    "bg-primary text-white shadow-lg ring-4 ring-primary/20 scale-110",
                  !isCompleted &&
                    !isCurrent &&
                    "bg-slate-200 text-slate-500"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3 8l3.5 3.5L13 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  step
                )}
              </div>
              {labels[i] && (
                <span
                  className={clsx(
                    "text-[10px] font-medium hidden sm:block text-center leading-tight max-w-[70px]",
                    isCurrent ? "text-primary" : "text-slate-400"
                  )}
                >
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
