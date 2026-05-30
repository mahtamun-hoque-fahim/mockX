/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0C10",
        surface: "#131720",
        "surface-elevated": "#1A1F2E",
        border: "rgba(255,255,255,0.07)",
        accent: "#6C63FF",
        "accent-hover": "#7B74FF",
        "text-primary": "#F2F2F3",
        "text-secondary": "rgba(255,255,255,0.45)",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        onest: ["var(--font-onest)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.07)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-up": "slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
