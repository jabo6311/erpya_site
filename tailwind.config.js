/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors — extracted from the ERPyA logo
        brand: {
          navy:        "#0D2167",
          "navy-light":"#1535A0",
          "navy-dark": "#081853",
          cyan:        "#1AAAD4",
          "cyan-light":"#5BC8E5",
          "cyan-dark": "#1488AF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "orb-drift": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(30px,-20px) scale(1.08)" },
          "66%":     { transform: "translate(-20px,15px) scale(0.96)" },
        },
        "orb-drift-b": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "40%":     { transform: "translate(-25px,20px) scale(1.1)" },
          "75%":     { transform: "translate(15px,-10px) scale(0.95)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "orb-a": "orb-drift 13s ease-in-out infinite",
        "orb-b": "orb-drift-b 17s ease-in-out infinite",
        "orb-c": "orb-drift 20s ease-in-out infinite reverse",
        "fade-up":     "fade-up .5s ease both",
        "fade-up-100": "fade-up .5s .1s ease both",
        "fade-up-200": "fade-up .5s .2s ease both",
        "fade-up-300": "fade-up .5s .3s ease both",
      },
    },
  },
  plugins: [],
}
