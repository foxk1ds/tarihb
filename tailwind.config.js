/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#07090C",
        panel: "#0B0E13",
        carbon: "#101419",
        amber: {
          DEFAULT: "#F5A623",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706"
        },
        crimson: {
          DEFAULT: "#E5484D",
          400: "#F16A6E",
          500: "#D93A40",
          600: "#B42A30"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.055em"
      },
      backgroundImage: {
        "grid-fine":
          "linear-gradient(to right, rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.035) 1px, transparent 1px)",
        "amber-fade": "linear-gradient(135deg, #FCD34D 0%, #F59E0B 45%, #B45309 100%)",
        "panel-sheen":
          "linear-gradient(160deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.015) 38%, rgba(255,255,255,0) 70%)"
      },
      boxShadow: {
        lift: "0 24px 80px -32px rgba(0,0,0,.85)",
        "amber-glow": "0 0 60px -18px rgba(245,158,11,.55)",
        "crimson-glow": "0 0 60px -18px rgba(229,72,77,.45)",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,.07)"
      },
      animation: {
        marquee: "marquee 42s linear infinite",
        "spin-slow": "spin 26s linear infinite",
        "spin-slower": "spin 60s linear infinite",
        "pulse-ring": "pulse-ring 3.4s cubic-bezier(.2,.6,.3,1) infinite",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite",
        "fade-up": "fade-up .65s cubic-bezier(.16,1,.3,1) both",
        float: "float 7s ease-in-out infinite",
        scan: "scan 9s ease-in-out infinite",
        shimmer: "shimmer 2.6s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(.35)", opacity: ".85" },
          "75%, 100%": { transform: "scale(1.7)", opacity: "0" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: ".35" },
          "50%": { opacity: "1" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0,16px,0)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0)", filter: "blur(0)" }
        },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" }
        },
        scan: {
          "0%, 100%": { transform: "translateX(-15%)", opacity: "0" },
          "15%, 85%": { opacity: ".5" },
          "50%": { transform: "translateX(115%)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      }
    }
  },
  plugins: []
};
