/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#05002b',
        'light-white': 'rgba(255,255,255,0.17)',
        'ztz-indigoblue': '#4158be',
        'ztz-mainblue': '#8e95ff',
        'ztz-softblue': '#8dbaff',
      },
    },
  },
  plugins: [],
};
