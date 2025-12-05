import type { Config } from "tailwindcss";
import lineClamp from "@tailwindcss/line-clamp";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       maxWidth: '1000ch', // add required value here
      //     }
      //   }
      // },
      screens: {
        lg: "1128px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
      },
      colors: {
        "bg-outside": "var(--bg-outside)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        accent: "var(--accent)",
        line: "var(--line)",
        "button-hover": "var(--button-hover)",
        "button-active": "var(--button-active)",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        bounceArrow: {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "translateY(0)",
            color: "#86E5FF",
          },
          "40%": { transform: "translateY(-30px)", color: "#F472B6" },
          "60%": { transform: "translateY(-15px)", color: "#86E5FF" },
        },
        quietSoundWave: {
          "25%": { transform: "scaleY(.6)" },
          "50%": { transform: "scaleY(.4)" },
          "75%": { transform: "scaleY(.8)" },
        },
        normalSoundWave: {
          "25%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(.4)" },
          "75%": { transform: "scaleY(.6)" },
        },
        loudSoundWave: {
          "25%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(.4)" },
          "75%": { transform: "scaleY(1.2)" },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear infinite",
        "bounce-arrow": "bounceArrow 2s infinite",
        "quiet-sound-wave": "quietSoundWave 1.2s ease-in-out infinite",
        "normal-sound-wave": "normalSoundWave 1.2s ease-in-out infinite",
        "loud-sound-wave": "loudSoundWave 1.2s ease-in-out infinite",
      },
      cursor: {
        link: "url(/link-cursor.png), pointer",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
