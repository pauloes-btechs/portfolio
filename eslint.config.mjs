// Next 16 removed `next lint`; run ESLint directly via the Next plugin.
// `recommended` only: core-web-vitals pulls in react/react-dom plugin rules
// that this minimal setup doesn't register.
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "resume-coach/**", "**/._*"],
  },
  {
    files: ["app/**/*.js", "app/**/*.jsx", "components/**/*.js", "components/**/*.jsx", "lib/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
  },
];
