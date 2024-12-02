/** @type {import("@types/prettier").Options} */
export default {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss' /* Must come last */],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
