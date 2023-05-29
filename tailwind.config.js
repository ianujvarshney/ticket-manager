/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.ts(x)", "index.html"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
