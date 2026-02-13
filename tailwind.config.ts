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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#004c99",
        "accent-red": "#a50044",
        "accent-gold": "#edbb00",
        "background-dark": "#0f1923",
        "card-dark": "#162330",
        "neutral-navy": "#1a2a3a",
        barca: {
          blue: "#004c99",
          "blue-light": "#1a6fc4",
          red: "#a50044",
          "red-light": "#d4175c",
          navy: "#0f1923",
          "navy-light": "#162330",
          gold: "#edbb00",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.03)",
          hover: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.08)",
          "border-hover": "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"],
        body: ["Lexend", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 20% 80%, rgba(0,76,153,0.15) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(165,0,68,0.1) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(237,187,0,0.05) 0%, transparent 50%)",
        "glow-blue":
          "radial-gradient(circle, rgba(0,76,153,0.4) 0%, transparent 70%)",
        "glow-red":
          "radial-gradient(circle, rgba(165,0,68,0.3) 0%, transparent 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        "pulse-red": "pulseRed 2s infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(0,76,153,0.3)" },
          "50%": { borderColor: "rgba(0,76,153,0.6)" },
        },
        pulseRed: {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(165, 0, 68, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 10px rgba(165, 0, 68, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(165, 0, 68, 0)",
          },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(0,76,153,0.3)",
        glow: "0 0 30px -5px rgba(0,76,153,0.4)",
        "glow-lg": "0 0 60px -10px rgba(0,76,153,0.3)",
        "glow-red": "0 0 30px -5px rgba(165,0,68,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
