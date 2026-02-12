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
        barca: {
          blue: "#004D98",
          "blue-light": "#1a6fc4",
          red: "#A50044",
          "red-light": "#d4175c",
          navy: "#0a0a1a",
          "navy-light": "#12122a",
          gold: "#C5A55A",
        },
        surface: {
          DEFAULT: "rgba(255,255,255,0.03)",
          hover: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.08)",
          "border-hover": "rgba(255,255,255,0.15)",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 20% 80%, rgba(0,77,152,0.15) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(165,0,68,0.1) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(197,165,90,0.05) 0%, transparent 50%)",
        "glow-blue": "radial-gradient(circle, rgba(0,77,152,0.4) 0%, transparent 70%)",
        "glow-red": "radial-gradient(circle, rgba(165,0,68,0.3) 0%, transparent 70%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
        grain: "grain 0.5s steps(1) infinite",
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
          "0%, 100%": { borderColor: "rgba(0,77,152,0.3)" },
          "50%": { borderColor: "rgba(0,77,152,0.6)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      boxShadow: {
        "glow-sm": "0 0 15px -3px rgba(0,77,152,0.3)",
        glow: "0 0 30px -5px rgba(0,77,152,0.4)",
        "glow-lg": "0 0 60px -10px rgba(0,77,152,0.3)",
        "glow-red": "0 0 30px -5px rgba(165,0,68,0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
