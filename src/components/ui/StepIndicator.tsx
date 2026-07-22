import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-brand-border -z-10" />

        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-300 -z-10"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div
              key={label}
              className="flex flex-col items-center bg-brand-card px-2"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : isCurrent
                    ? 'bg-purple-500 text-white ring-4 ring-purple-500/20 shadow-lg shadow-purple-500/40 scale-105'
                    : 'bg-brand-muted text-zinc-500 border border-brand-border'
                }`}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`text-[11px] mt-2.5 font-medium tracking-wide uppercase hidden sm:block ${
                  isCurrent ? 'text-purple-400 font-bold' : 'text-zinc-500'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
