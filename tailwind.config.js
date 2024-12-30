import { img } from 'motion/react-client'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bannerBg: "url('/src/assets/bg.svg')",
        registrationBg: "url('/src/assets/registerBg.svg')",
      },
      colors: {
        primary: '#05264e',
        secondary: '#a0abb8',
        highlight: '#3c65f5',
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
