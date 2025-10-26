"use client";

import { InputHTMLAttributes, forwardRef } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-galaxy-silver mb-2"
        >
          {label}
        </label>
        <input
          ref={ref}
          className={`block w-full px-3 py-2 mt-1 text-white bg-galaxy-secondary/50 border border-galaxy-cyan/30 rounded-md shadow-sm placeholder-galaxy-silver/60 focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan focus:bg-galaxy-secondary/70 sm:text-sm galaxy-glow-soft ${className} ${
            error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
          }`}
          {...props}
        />
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

FormInput.displayName = 'FormInput';

export default FormInput;

