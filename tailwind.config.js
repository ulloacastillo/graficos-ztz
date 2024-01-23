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
        '8A90F1': '#F6F8FA',
        glass: 'rgba(255,255,255,0.25)',
      },
      backgroundImage: {
        velentin: "url('/public/velentines.jpeg')",
      },
    },
  },
  plugins: [],
};
