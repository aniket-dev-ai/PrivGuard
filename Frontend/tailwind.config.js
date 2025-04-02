/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#121212",
        darkCard: "#1E1E1E",
        darkPrimary: "#00D8FF",
        darkSecondary: "#FF4081",
        darkText: "#FFFFFF",
        darkSubText: "#B3B3B3",

        lightBg: "#EEEEEE",
        lightCard: "#FFFFFF",
        lightPrimary: "#27548A",
        lightSecondary: "#E63946",
        lightText: "#333333",
        lightSubText: "#666666",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};

        // lightBg: "#F5F5F5",