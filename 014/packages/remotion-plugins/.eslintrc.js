/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "no-type-assertion"],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
  ],
  rules: {
    "no-shadow": "off",
    "no-console": "warn",
    "no-unused-vars": "off",
    "prefer-template": "warn",
    "prettier/prettier": "warn",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-duplicate-imports": "warn",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-reduce-type-parameter": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "no-type-assertion/no-type-assertion": "warn",
    "react/self-closing-comp": "warn",
  },
};

module.exports = eslintConfig;
