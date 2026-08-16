/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080C12',
          surface: '#0D131C',
          elevated: '#121A25',
        },
        accent: {
          cyan: '#22D3EE',
          blue: '#3B82F6',
          purple: '#8B5CF6',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(103,232,249,0.12), 0 12px 32px rgba(0,0,0,0.24)',
        card: '0 22px 65px rgba(0,0,0,0.28)',
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
