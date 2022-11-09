/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.{js,html,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      },
      animation: {
        cloud: "cloud calc(6s * var(--i)) linear infinite",
      },
      keyframes: {
        cloud: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      width: {
        100: "50rem",
      },
      height: {
        100: "57rem",
      },
      inset: {
        100: "23rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
