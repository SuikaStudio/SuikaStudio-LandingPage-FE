import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        suika: {
          white: "#FDFBF4",
          green: "#6A994E",
          light: "#A7C957",
          yellow: "#F2C94C",
          brown: "#A68A64",
          dark: "#283618",
          gray: "#E0E0E0",
        },
      },
    },
  },
  plugins: [],
};

export default config;
