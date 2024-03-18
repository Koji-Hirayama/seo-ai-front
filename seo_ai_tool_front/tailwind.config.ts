import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        color1: {
          1: "#0ea5e9",
          2: "#0284c7",
        },
      },
      textColor: {
        textColor1: {
          DEFAULT: "#333",
        },
        textColor2: {
          DEFAULT: "#444",
        },
        textColor3: {
          DEFAULT: "#555",
        },
      },
      borderRadius: {
        radius1: "8px",
      },

      // アニメーション定義
      //=======================================
      animation: {
        simpleFadeIn: "fadeIn 0.2s ease-out forwards",
        scaleInCenter:
          "scaleInCenter 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        slideInBckTop:
          "slideInBckTop 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleInCenter: {
          "0%": {
            transform: "scale(0)",
            opacity: "1",
          },
          to: {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        slideInBckTop: {
          "0%": {
            transform: "translateZ(700px) translateY(-100px)",
            opacity: "0",
          },
          to: {
            transform: "translateZ(0) translateY(0)",
            opacity: "1",
          },
        },
      },
      //=======================================
    },
  },
  plugins: [],
};
export default config;
