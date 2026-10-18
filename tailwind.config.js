/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        proto: {
          yellow: '#f6e81e',
          cyan: '#19e3f5',
          gold: '#e6d84a',
          ink: '#04070b',
        },
        cyber: {
          black: '#04060B',
          void: '#020306',
          dark: '#0A0E17',
          night: '#101522',
          panel: '#0E131F',
          yellow: '#f6e81e', // User specified #f6e81e
          'yellow-light': '#FFF56D',
          'yellow-glow': 'rgba(246, 232, 30, 0.4)',
          blue: '#19e3f5',   // User specified #19e3f5
          'blue-bright': '#38BDF8',
          'blue-deep': '#0066FF',
          'blue-glow': 'rgba(25, 227, 245, 0.4)',
          red: '#FF003C',
          surface: '#0F1626',
          border: '#1E293B',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        spacemono: ['"Space Mono"', 'monospace'],
        cynatar: ['"Cynatar"', '"Chakra Petch"', 'sans-serif'],
        cyber: ['"Rajdhani"', 'sans-serif'],
        cyberpunk: ['"Chakra Petch"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
        tech: ['"Chakra Petch"', 'sans-serif'],
        display: ['"Cinzel"', 'serif'],
        mono: ['"Space Mono"', '"Share Tech Mono"', 'monospace'],
        body: ['"Inter"', '"Rajdhani"', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 25px -5px rgba(0, 240, 255, 0.6), 0 0 10px -2px rgba(0, 240, 255, 0.4)',
        'neon-yellow': '0 0 25px -5px rgba(252, 238, 10, 0.6), 0 0 10px -2px rgba(252, 238, 10, 0.4)',
        'neon-red': '0 0 25px -5px rgba(255, 0, 60, 0.6), 0 0 10px -2px rgba(255, 0, 60, 0.4)',
        'neon-dual': '0 0 20px -3px rgba(0, 240, 255, 0.5), 0 0 30px -5px rgba(252, 238, 10, 0.4)',
      },
      backgroundImage: {
        'grid-pattern': "radial-gradient(circle, rgba(0, 240, 255, 0.12) 1px, transparent 1px)",
        'cyber-gradient': 'linear-gradient(180deg, rgba(4, 6, 11, 0) 0%, rgba(4, 6, 11, 0.85) 50%, #04060B 100%)',
      }
    },
  },
  plugins: [],
}
