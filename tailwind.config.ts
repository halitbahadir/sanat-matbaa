import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ed",
          100: "#fdedd3",
          200: "#fbd8a5",
          300: "#f8bc6d",
          400: "#f59e33",
          500: "#f2810c",
          600: "#e36607",
          700: "#bc4d09",
          800: "#963e0f",
          900: "#793510",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        brown: {
          50: "#fdf4e8",
          100: "#fae5c4",
          200: "#f5ca8e",
          300: "#efa856",
          400: "#e8882e",
          500: "#d97316",
          600: "#b85a12",
          700: "#974714",
          800: "#7a3a15",
          900: "#653214",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

