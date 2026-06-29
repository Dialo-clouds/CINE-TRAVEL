import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#FFFFFF",
        muted: {
          DEFAULT: "rgba(255, 255, 255, 0.6)",
          foreground: "rgba(255, 255, 255, 0.4)",
        },
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          foreground: "#FFFFFF",
        },
        border: "rgba(255, 255, 255, 0.1)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
