/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        elane: {
          espresso: {
            DEFAULT: '#090706',
            deep: '#050403',
            rich: '#110D0B',
            surface: '#17120F',
            card: '#1D1714',
            border: '#2E241F',
          },
          pearl: {
            DEFAULT: '#FFF0F3',
            pure: '#FFFFFF',
            silk: '#FAF0F2',
            soft: '#FFE4E8',
          },
          rose: {
            DEFAULT: '#E23B55',
            light: '#FF6B8B',
            radiant: '#FF8FA3',
            rich: '#C72C41',
            deep: '#941829',
            soft: '#FFE4E8',
          },
          gold: {
            DEFAULT: '#E2B887',
            light: '#F5DEBE',
            radiant: '#F2D2A9',
            rich: '#D4A26C',
            deep: '#AA793F',
          },
          sand: {
            DEFAULT: '#C9B6A0',
            muted: '#8E7E6E',
            dark: '#584C42',
          },
        },
      },
      fontFamily: {
        serif: ['Italiana', '"Bodoni Moda"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Bodoni Moda"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        italiana: ['Italiana', 'serif'],
        display: ['Cinzel', 'serif'],
        sans: ['Outfit', '"Plus Jakarta Sans"', 'Montserrat', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.22em',
        ultrawide: '0.35em',
        editorial: '0.45em',
      },
      boxShadow: {
        'rose-glow': '0 0 35px rgba(226, 59, 85, 0.4)',
        'rose-glow-lg': '0 0 50px rgba(226, 59, 85, 0.55)',
        'bronze-glow': '0 0 35px rgba(197, 139, 88, 0.3)',
        'gold-glow': '0 0 40px rgba(229, 195, 120, 0.35)',
        'dark-card': '0 20px 50px -15px rgba(0, 0, 0, 0.75)',
        'dark-card-hover': '0 30px 60px -12px rgba(226, 59, 85, 0.3)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.75', transform: 'scale(1.06)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
