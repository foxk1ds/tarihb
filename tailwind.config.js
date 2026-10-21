/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        paper: "#f7f5f1",
        amber: { 450: "#d38b1d" },
        crimson: "#9f2e31"
      },
      boxShadow: {
        "document": "0 20px 55px -28px rgb(39 39 42 / 0.35)"
      }
    }
  },
  plugins: []
};
