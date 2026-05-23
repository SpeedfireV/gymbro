/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        stencil: ['SairaStencil-reg'],
        impact: ['Impact'],
        michroma: ['Michroma-reg'],
        antonio: ['Antonio'],
      },
      colors: {
        fireRed: '#E03616',
        activeYellow: '#FBAF00',
        coffeeBackground: '#322214',
        blueSlate: '#39393A',
        platiniumWhite: '#EFF1F3',
        background: '#111111',
        onSurface: '#181818',
        inputBackground: '#242423',
        

      }
    },
  },
  plugins: [],
}
