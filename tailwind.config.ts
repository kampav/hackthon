import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lloyds: {
          green:     '#006a4d',
          'green-dark': '#004f3a',
          'green-mid':  '#00856b',
          'green-light':'#e6f4f0',
          black:     '#1a1a1a',
          white:     '#ffffff',
          grey:      '#f5f5f5',
          'grey-mid':'#e0e0e0',
          'grey-dark':'#767676',
          text:      '#1a1a1a',
          'text-2':  '#555555',
        },
        status: {
          red:    '#d0021b',
          amber:  '#f5a623',
          green:  '#4caf50',
          blue:   '#1565c0',
        },
      },
      fontFamily: {
        sans: ['Lloyds Jack', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
