// eslint.config.cjs
// ───────────────────────────────────────────────────────────────────────────
// 1) patch ESLint’s module resolution so “eslint-config-next” can pull in
//    its own plugins without you manually installing them everywhere
require('@rushstack/eslint-patch/modern-module-resolution');

// 2) pull in Next’s base rules and React’s recommended rules
const nextConfig  = require('eslint-config-next');
const reactPlugin = require('eslint-plugin-react');

/** @type {import('@eslint/eslintrc').FlatESLintConfig[]} */
module.exports = [
  // Next.js Core rules (incl. next/core-web-vitals, react-hooks, etc)
  nextConfig,

  // React recommended
  reactPlugin.configs.recommended,

  // Your overrides
  {
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Enforce PascalCase for component names
      'react/jsx-pascal-case': [
        'error',
        { allowAllCaps: false, ignore: [], allowLeadingUnderscore: false }
      ],
      // You don’t need to import React in scope
      'react/react-in-jsx-scope': 'off',
      // You’re not using PropTypes everywhere
      'react/prop-types': 'off',
    },
  },
];
