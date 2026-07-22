import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
          {label} {props.required && <span className="text-purple-400">*</span>}
        </label>

        <input
          id={inputId}
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl text-sm font-medium
            bg-brand-muted text-zinc-100 placeholder:text-zinc-500
            border transition-all duration-200 outline-none
            ${
              error
                ? 'border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                : 'border-brand-border hover:border-zinc-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20'
            }
            ${props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${className}
          `}
          {...props}
        />

        {error ? (
          <span className="text-xs text-red-400 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-zinc-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';