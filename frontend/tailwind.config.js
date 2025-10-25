/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        galaxy: {
          primary: 'var(--galaxy-primary)',
          secondary: 'var(--galaxy-secondary)',
          accent: 'var(--galaxy-accent)',
          purple: 'var(--galaxy-purple)',
          pink: 'var(--galaxy-pink)',
          cyan: 'var(--galaxy-cyan)',
          gold: 'var(--galaxy-gold)',
          silver: 'var(--galaxy-silver)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'galaxy-shift': 'galaxy-shift 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'sparkle': 'sparkle 20s linear infinite',
      },
      keyframes: {
        'galaxy-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(0, 212, 255, 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.6)'
          },
        },
        'sparkle': {
          'from': { transform: 'translateY(0px)' },
          'to': { transform: 'translateY(-100px)' },
        },
      },
      boxShadow: {
        'galaxy': '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(83, 52, 131, 0.2), 0 0 60px rgba(233, 69, 96, 0.1)',
        'galaxy-soft': '0 0 10px rgba(0, 212, 255, 0.2), 0 0 20px rgba(83, 52, 131, 0.1)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
