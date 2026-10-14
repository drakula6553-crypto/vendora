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
        background: "#030712",
        foreground: "#F9FAFB",
        midnight: "#030712",
        darknavy: "#070F1E",
        electric: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#172554",
          cyan: "#00E5FF",
          glow: "#38BDF8",
        },
        gold: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
          amber: "#F59E0B",
          bronze: "#E07A22",
        },
        slate: {
          dark: "#080F1D",
          card: "rgba(8, 17, 34, 0.72)",
          cardBorder: "rgba(59, 130, 246, 0.16)",
          textMuted: "#94A3B8",
          textSecondary: "#CBD5E1",
          accent: "#38BDF8",
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
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
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
