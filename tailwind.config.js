/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("tailwind-gradient-mask-image")],
  theme: {
    extend: {
      boxShadow: {
        "xl-center": "0 6px 35px -3px rgba(0, 0, 0, 0.3)",
      },
    },
  },
};
