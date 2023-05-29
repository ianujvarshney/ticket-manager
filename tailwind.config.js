/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.ts(x)", "index.html"],
  theme: {
    extend: {
      animation: {
        slideIn: "slideIn 50ms cubic-bezier(0.16, 1, 0.3, 1);",
        hide: "hide 100ms ease-in;",
        slideOut: "swipeOut 100ms ease-out",
      },

      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(calc(100% + 16px));" },
          "100%": { transform: "translateY(0);" },
        },

        slideOut: {
          "0%": "translateY(var(--radix-toast-swipe-end-y));",
          "100%": { transform: "translateX(calc(100% + var(16px)));" },
        },

        hide: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
