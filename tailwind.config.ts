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
        background: "#050B18",
        foreground: "#F8FAFC",
        midnight: "#050B18",
        darknavy: "#0A192F",
        electric: {
          DEFAULT: "#4F8CFF",
          50: "#EEF5FF",
          100: "#DBEAFF",
          200: "#BFD8FF",
          300: "#94C0FF",
          400: "#6DA4FF",
          500: "#4F8CFF",
          600: "#2F6CE6",
          700: "#1C4EB8",
          800: "#14378A",
          900: "#0D255C",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F5DF87",
          muted: "#9D7D1E",
          dark: "#7A6115",
        },
        slate: {
          dark: "#0F223D",
          card: "rgba(10, 25, 47, 0.7)",
          cardBorder: "rgba(79, 140, 255, 0.15)",
          textMuted: "#8892B0",
          textSecondary: "#A8B2D1",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-glow": "radial-gradient(circle at 50% 20%, rgba(79, 140, 255, 0.15) 0%, transparent 60%)",
        "gold-glow": "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 50%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 8px 32px 0 rgba(79, 140, 255, 0.15), inset 0 0 0 1px rgba(79, 140, 255, 0.2)",
        "gold-glow": "0 8px 32px 0 rgba(212, 175, 55, 0.2), inset 0 0 0 1px rgba(212, 175, 55, 0.3)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
