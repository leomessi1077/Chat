/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#128C7E',
        primaryDark: '#075E54',
        secondary: '#25D366',
        teal: '#00A884',
        tealDark: '#008069',
        background: '#0B141A',
        chatBg: '#0D1418',
        messageBg: '#202C33',
        inputBg: '#2A3942',
      }
    },
  },
  plugins: [],
}

