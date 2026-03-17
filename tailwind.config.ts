import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#7c3aed', light: '#a78bfa' },
        accent:  { DEFAULT: '#06b6d4', light: '#67e8f9' },
        danger:  { DEFAULT: '#f43f5e' },
      },
    },
  },
  plugins: [],
}

export default config
