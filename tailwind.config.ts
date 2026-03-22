import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        surface_container_lowest: "var(--surface-container-lowest)",
        surface_container_low: "var(--surface-container-low)",
        surface_container: "var(--surface-container)",
        surface_container_high: "var(--surface-container-high)",
        surface_container_highest: "var(--surface-container-highest)",
        surface_bright: "var(--surface-bright)",
        primary_container: "var(--primary-container)",
        primary_fixed: "var(--primary-fixed)",
        primary_fixed_dim: "var(--primary-fixed-dim)",
        secondary_container: "var(--secondary-container)",
        tertiary_container: "var(--tertiary-container)",
        surface_tint: "var(--surface-tint)",
        on_surface: "var(--on-surface)",
        on_surface_variant: "var(--on-surface-variant)",
        on_primary_fixed: "var(--on-primary-fixed)",
        on_secondary_container: "var(--on-secondary-container)",
        on_tertiary_container: "var(--on-tertiary-container)",
        outline_variant: "var(--outline-variant)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        md: "0.375rem",
        lg: "0.5rem",
      },
      spacing: {
        "0.1": "0.025rem",
        "0.3": "0.075rem",
        "0.5": "0.125rem",
        "1.5": "0.375rem",
        "2.5": "0.625rem",
        "3": "0.75rem",
      },
      boxShadow: {
        ambient: "0 4px 40px 0 rgba(237,237,237,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
