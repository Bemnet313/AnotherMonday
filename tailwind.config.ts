import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0e6",
        "cream/90": "rgba(245, 240, 230, 0.9)",
        olive: {
          50: "#f4f7f4",
          100: "#e3ebe3",
          200: "#c5d9c5",
          300: "#9bbd9b",
          400: "#6e9c6e",
          500: "#4d7e4d",
          600: "#3a613a",
          700: "#2f4d2f",
          800: "#283e28",
          900: "#223322", // Matches bg-deep roughly
          950: "#111c11",
        },
        forest: {
          DEFAULT: "#1a2f1a", // Existing bg-deep
          light: "#2a422a",
          lighter: "#3a563a",
        },
        neon: {
          DEFAULT: "#34d399", // emerald-400
          glow: "rgba(52, 211, 153, 0.5)",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        }
      },
      gradientColorStops: {
        "glass-start": "rgba(255, 255, 255, 0.05)",
        "glass-end": "rgba(255, 255, 255, 0.00)",
      }
    },
  },
  plugins: [],
};

export default config;
