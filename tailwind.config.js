/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    screens: {
      "max-sm": "360px",
      sm2: "390px",
      sm: "481px",
      md: "641px",
      lg: "961px",
      xl: "1025px",
      "2xl": "1250px",
      "3xl": "1400px",
    },
    extend: {
      keyframes: {
        slideIn: {
          "0%": { left: "-11rem" },
          "50%": { left: "-16rem" },
          "100%": { left: "0" },
        },
        slideOut: {
          "0%": { left: "0" },
          "50%": { left: "-16rem" },
          "100%": { left: "-11rem" },
        },
        hideText: {
          "0%": { display : "flex" },
          "100%": { display: "none" },
        },
        showText: {
          "0%": { display : "none" },
          "100%": { display: "flex" },
        },
        justifyStart: {
          "0%": { justifyContent : "end" },
          "100%": { justifyContent: "start" },
        },
        justifyEnd: {
          "0%": { justifyContent : "start" },
          "100%": { justifyContent: "end" },
        },
      },
      animation: {
        slideIn: 'slideIn 600ms forwards',
        slideOut: 'slideOut 600ms forwards',
        showText: 'showText 600ms forwards',
        hideText: 'hideText 400ms forwards',
        justifyStart: 'justifyStart 600ms forwards',
        justifyEnd: 'justifyEnd 600ms forwards',
      }
    },
  },
  plugins: [],
};
