import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#646cff",
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(209 213 219)', // text-gray-300
            h1: {
              color: 'rgb(243 244 246)', // text-gray-100
            },
            h2: {
              color: 'rgb(243 244 246)', // text-gray-100
            },
            h3: {
              color: 'rgb(229 231 235)', // text-gray-200
            },
            strong: {
              color: 'rgb(229 231 235)', // text-gray-200
            },
            code: {
              color: 'rgb(229 231 235)', // text-gray-200
            },
            blockquote: {
              color: 'rgb(156 163 175)', // text-gray-400
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} satisfies Config;
