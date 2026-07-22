import { forwardRef, type SelectHTMLAttributes } from 'react';

export interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
  isLoading?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, isLoading, className = '', id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={selectId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {label} {props.required && <span className="text-purple-400">*</span>}
        </label>

        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            disabled={isLoading || props.disabled}
            className={`
              w-full px-4 py-3 rounded-xl text-sm font-medium appearance-none pr-10
              bg-brand-muted text-zinc-100 border transition-all duration-200 outline-none
              ${
                error
                  ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  : 'border-brand-border hover:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
              }
              ${isLoading || props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${className}
            `}
            {...props}
          >
            <option value="" className="bg-brand-card text-zinc-400">
              {isLoading ? 'Carregando opções...' : 'Selecione uma opção'}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-brand-card text-zinc-100">
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-zinc-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        {error && <span className="text-xs text-red-400 font-medium">{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';