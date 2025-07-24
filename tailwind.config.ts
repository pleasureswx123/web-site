import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Arknights color palette
        'ak-primary': '#0099ff',
        'ak-secondary': '#00ccff',
        'ak-accent': '#ff6600',
        'ak-dark': '#0a0a0a',
        'ak-gray': '#1a1a1a',
        'ak-light-gray': '#2a2a2a',
        'ak-text': '#ffffff',
        'ak-text-secondary': '#cccccc',
        'ak-border': '#333333',
      },
      fontFamily: {
        'ak-primary': ['var(--font-ak-primary)', 'sans-serif'],
        'ak-secondary': ['var(--font-ak-secondary)', 'monospace'],
        'ak-title': ['var(--font-ak-title)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0099ff' },
          '100%': { boxShadow: '0 0 20px #0099ff, 0 0 30px #0099ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'ak-gradient': 'linear-gradient(135deg, #0099ff 0%, #00ccff 100%)',
      },
    },
  },
  plugins: [],
}

export default config
