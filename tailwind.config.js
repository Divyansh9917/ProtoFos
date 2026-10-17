/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030711",
          deep: "#050A14",
          atmosphere: "#071321",
          cyan: "#00E5FF",
          blue: "#168CFF",
          violet: "#7C3AED",
          magenta: "#FF2BD6",
          dark: "#0a0f1d",
          border: "rgba(0, 229, 255, 0.2)",
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        syncopate: ['Syncopate', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.4), 0 0 40px rgba(0, 229, 255, 0.2)',
        'neon-magenta': '0 0 20px rgba(255, 43, 214, 0.4), 0 0 40px rgba(255, 43, 214, 0.2)',
        'neon-violet': '0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'flicker': 'flicker 4s infinite',
        'scanline': 'scanline 6s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(0,229,255,0.6))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(0,229,255,0.9))' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '0.99' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.35' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
