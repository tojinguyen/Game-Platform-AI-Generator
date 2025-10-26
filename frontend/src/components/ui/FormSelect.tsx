"use client";

import { SelectHTMLAttributes, forwardRef } from 'react';

export interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-galaxy-silver mb-2"
        >
          {label}
        </label>
        <select
          ref={ref}
          className={`block w-full px-3 py-2 mt-1 text-white bg-galaxy-secondary/50 border border-galaxy-cyan/30 rounded-md shadow-sm focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan focus:bg-galaxy-secondary/70 sm:text-sm galaxy-glow-soft ${className} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        >
          {props.placeholder && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-galaxy-silver/70">{helperText}</p>
        )}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;

