// eslint.config.js
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import pluginImport from "eslint-plugin-import"
import pluginSecurity from "eslint-plugin-security"

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
      },
    },
    plugins: {
      import: pluginImport,
      security: pluginSecurity,
    },
    rules: {
      // eslint-disable-next-line no-undef
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]
