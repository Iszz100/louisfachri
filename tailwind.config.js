/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#060A12',
          surface: '#0F172A',
          elevated: '#111827',
        },
        accent: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          purple: '#8B5CF6',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,189,248,0.18), 0 8px 24px rgba(8,145,178,0.15)',
        card: '0 18px 50px rgba(2,6,23,0.32)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        hero: 'clamp(2rem, 7vw, 5.25rem)',
        section: 'clamp(1.5rem, 2.4vw, 2.6rem)',
        body: 'clamp(0.95rem, 1.1vw, 1.05rem)',
      },
      spacing: {
        section: 'clamp(4rem, 9vw, 8rem)',
      },
      backgroundImage: {
        'tech-grid':
          'linear-gradient(rgba(34,211,238,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.07) 1px, transparent 1px)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.72', transform: 'scale(1.06)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
