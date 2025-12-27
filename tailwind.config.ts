import type { Config } from 'tailwindcss'

// Tailwind v4 uses CSS-first configuration
// Most configuration is now done in src/styles/global.css using @theme and @plugin
// This file is kept for content paths and basic compatibility
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}',
    '!./src/pages/og-image/[slug].png.ts',
  ],
} satisfies Config
