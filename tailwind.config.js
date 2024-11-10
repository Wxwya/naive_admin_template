/** @type {import('tailwindcss').Config} */
const { addIconSelectors } = require('@iconify/tailwind');
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    addIconSelectors(['emojione-v1','gg','solar',"ic"]),
  ],
  corePlugins: {
    preflight: false // 关闭默认样式
  }
}