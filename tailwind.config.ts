import type { Config } from "tailwindcss";

const config: Config = {
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
        navy: {
          800: "#1e293b",
          900: "#0f172a",
          950: "#0b1329",
        },
        brand: {
          blue: "#2563eb",
          lightBlue: "#3b82f6",
          amber: "#f59e0b",
          green: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
export default config;
