/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
  "./pages/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}",
  "./app/**/*.{js,jsx,ts,tsx}",
  "./src/**/*.{js,jsx,ts,tsx}",
],

  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "450px",
        lg: "1025px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        milker: ["Milker", "sans-serif"],
        transcity: ["Transcity", "sans-serif"],
        poppins: ["Poppins-Regular", "sans-serif"],
        "poppins-bold": ["Poppins-Bold", "sans-serif"],
        anton: ["Anton", "sans-serif"],
        bebas: ['"Bebas Neue"', "sans-serif"],
        cinzel: ["Cinzel", "sans-serif"],
        syne: ['"Syne"', "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "cormorant-infant": ['"Cormorant Infant"', "sans-serif"],
        serifDisplay: ['"DM Serif Display"', 'serif'],
      },

      colors: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-60px)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeZoomIn: {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        pulseSlow: {
          "0%, 100%": {
            boxShadow: "0 0 10px rgba(34, 197, 94, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.8)",
          },
        },
        popup: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        popupIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50px) scale(0.95) blur(4px)",
          },
          "100%": { opacity: "1", transform: "translateY(0) scale(1) blur(0)" },
        },
        popupOut: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1) blur(0)" },
          "100%": {
            opacity: "0",
            transform: "translateY(-50px) scale(0.95) blur(4px)",
          },
        },
        comet: {
          "0%": { top: "0%", left: "0%", width: "100%", height: "2px" },
          "25%": { top: "0%", right: "0%", width: "2px", height: "100%" },
          "50%": { bottom: "0%", right: "0%", width: "100%", height: "2px" },
          "75%": { bottom: "0%", left: "0%", width: "2px", height: "100%" },
          "100%": { top: "0%", left: "0%", width: "100%", height: "2px" },
        },

        floating: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-80px)",
          },
        },
        gradientMove: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        drift: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(20px)" },
        },
        blink: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.4s ease-out",
        "accordion-up": "accordion-up 0.4s ease-out",
        floating: "floating 6s ease-in-out infinite",
        "gradient-move": "gradientMove 10s ease infinite",
        marquee: "marquee 10s linear infinite",
        "marquee-reverse": "marquee-reverse 15s linear infinite",

        "popup-open": "fadeZoomIn 0.3s ease-out",
        "popup-open-anim": "popup 0.4s ease-out",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        comet: "comet 4s linear infinite",
        popupIn: "popupIn 0.4s ease-out forwards",
        popupOut: "popupOut 0.3s ease-in forwards",
        "drift-slow": "drift 10s ease-in-out infinite alternate",
        blink: "blink 1.8s ease-in-out infinite",
        floatSlow: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};