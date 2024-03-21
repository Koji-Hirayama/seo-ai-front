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
        primary: {
          1: "#0ea5e9",
          2: "#0284c7",
        },
        failure: {
          1: "#f43f5e",
          2: "#e11d48",
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
        slideInBlurredTop:
          "slideInBlurredTop 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both",
        slideInEllipticTopFwd:
          "slideInEllipticTopFwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        slideInEllipticBottomFwd:
          "slideInEllipticBottomFwd 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        rotateScaleUp: "rotateScaleUp 0.7s linear   both",
        bounceInTop: "bounceInTop 1.1s ease   both",
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
        slideInBlurredTop: {
          "0%": {
            transform: "translateY(-1000px) scaleY(2.5) scaleX(.2)",
            "transform-origin": "50% 0%",
            filter: "blur(40px)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1",
          },
        },
        slideInEllipticTopFwd: {
          "0%": {
            transform: "translateY(-600px) rotateX(-30deg) scale(0)",
            "transform-origin": "50% 100%",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) rotateX(0) scale(1)",
            "transform-origin": "50% 1400px",
            opacity: "1",
          },
        },
        slideInEllipticBottomFwd: {
          "0%": {
            transform: "translateY(600px) rotateX(30deg) scale(0)",
            "transform-origin": "50% 100%",
            opacity: "0",
          },
          to: {
            transform: "translateY(0) rotateX(0) scale(1)",
            "transform-origin": "50% -1400px",
            opacity: "1",
          },
        },
        rotateScaleUp: {
          "0%": {
            transform: "scale(1) rotateZ(0)",
          },
          "50%": {
            transform: "scale(2) rotateZ(180deg)",
          },
          to: {
            transform: "scale(1) rotateZ(360deg)",
          },
        },
        bounceInTop: {
          "0%": {
            transform: "translateY(-500px)",
            "animation-timing-function": "ease-in",
            opacity: "0",
          },
          "38%": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
          "55%": {
            transform: "translateY(-65px)",
            "animation-timing-function": "ease-in",
          },
          "72%,90%,to": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
          },
          "81%": {
            transform: "translateY(-28px)",
          },
          "95%": {
            transform: "translateY(-8px)",
            "animation-timing-function": "ease-in",
          },
        },
      },
      //=======================================
    },
  },
  plugins: [],
};
export default config;
