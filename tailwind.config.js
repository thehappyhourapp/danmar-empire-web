/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Sampled from Daniel's Canva artwork: background #0f3b2f, marks #eee8e0 */
        paper:  { DEFAULT: "#EEE8E0", deep: "#E2DBD1", edge: "#CFC7BB" },
        ink:    { DEFAULT: "#12261F", deep: "#08160F", soft: "#2B4438" },
        forest: { DEFAULT: "#0F3B2F", deep: "#07241B", soft: "#17513F", mid: "#246552" },
        brass:  { DEFAULT: "#80642C", light: "#CDB177", pale: "#DFD0AC" },
        mute:   { DEFAULT: "#6C7A70", light: "#94A096" },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        display: ['var(--display-face)', '"Bodoni Moda"', '"Bodoni Moda Fallback"', 'Georgia', 'serif'],
        seal: ['"Gilda Display"', 'Georgia', 'serif'],
        sans: ['"Libre Franklin"', '"Libre Franklin Fallback"', 'ui-sans-serif', 'system-ui', 'Helvetica Neue', 'Arial', 'sans-serif'],
        /* figures ride the display serif with lining tabular numerals — never a monospace,
           which reads as a spreadsheet rather than a private-client report */
        mono: ['"Bodoni Moda"', '"Bodoni Moda Fallback"', 'Georgia', 'serif'],
      },
      letterSpacing: { meta: '0.16em', wide2: '0.28em' },
      /* Tailwind's default alpha scale only has 5% steps, so bg-paper/94,
         border-forest/14 and friends were generating no CSS at all. */
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, String(i / 100)])),
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        wipe: { from: { transform: "scaleX(0)" }, to: { transform: "scaleX(1)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
