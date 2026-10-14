import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.css",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#040912",
        foreground: "#F8FAFC",
        midnight: "#040912",
        darknavy: "#081020",
        electric: {
          50: "#F0F8FF",
          100: "#D6E4FF",
          200: "#A8C9FF",
          300: "#7AAEFF",
          400: "#4D94FF",
          500: "#3A7BFF",
          600: "#2B62D4",
          700: "#1F4E9A",
          800: "#183D7A",
          900: "#122C59",
        },
        gold: {
          50: "#FCF9F0",
          100: "#F7EFD8",
          200: "#EFD9A8",
          300: "#E4C478",
          400: "#D9AF48",
          500: "#CE9B18",
          600: "#A57C13",
          700: "#7D5E0F",
          800: "#55400A",
          900: "#2D2105",
        },
        slate: {
          dark: "#0D1A2B",
          card: "rgba(10, 25, 47, 0.6)",
          cardBorder: "rgba(58, 123, 255, 0.12)",
          textMuted: "#8B98A5",
          textSecondary: "#A8B2D1",
          accent: "#4F8CFF",
        },
        danger: {
          500: "#EF4444",
          600: "#DC2626",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "mesh-glow": "radial-gradient(circle at 50% 20%, rgba(79, 140, 255, 0.15) 0%, transparent 60%)",
        "gold-glow": "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12) 0%, transparent 50%)",
        "electric-glow": "radial-gradient(circle at 50% 50%, rgba(79, 140, 255, 0.1) 0%, transparent 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-glow": "0 8px 32px 0 rgba(79, 140, 255, 0.15), inset 0 0 0 1px rgba(79, 140, 255, 0.2)",
        "gold-glow": "0 8px 32px 0 rgba(212, 175, 55, 0.2), inset 0 0 0 1px rgba(212, 175, 55, 0.3)",
        "electric-glow": "0 8px 32px 0 rgba(79, 140, 255, 0.1), inset 0 0 0 1px rgba(79, 140, 255, 0.2)",
        "premium": "0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(79, 140, 255, 0.12)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        shimmer: "shimmer 3s infinite linear",
        "float-slow": "floatSlow 8s ease-in-out infinite",
      },
      blur: {
        xs: "2px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  safelist: [
    {
      pattern: /bg-(electric|gold)/,
    },
    {
      pattern: /text-(electric|gold)/,
    },
    {
      pattern: /border-(electric|gold)/,
    }
  ],
  plugins: [],
};
export default config;
