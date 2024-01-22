/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui"),
  require('@tailwindcss/forms')],
  daisyui: {
    // themes: ["bumblebee", "coffee","dark"],
themes: [
      "coffee","dark","bumblebee",
       {
          mytheme: {
"primary": "#c026d3",
"secondary": "#3b82f6",
"accent": "#fda4af",
"neutral": "#ffffff",
"base-100": "#fae8ff",
"info": "#ffffff",
"success": "#00ffff",
"warning": "#881337",
"error": "#111827",
          },
        },
      ],
  },
}

