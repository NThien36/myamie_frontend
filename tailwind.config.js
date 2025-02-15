/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: "1rem",
      },
      colors: {
        primary: {
          DEFAULT: "#3F6189", // Blue
          light: "#D5E9F9", // Light Blue
          lighter: "#EBF4FB", // Lighter Blue
        },
        background: "#fbfbfb",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
