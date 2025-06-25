// eslint.config.cjs
const nextConfig = require("eslint-config-next");
const pluginReact = require("eslint-plugin-react");

/** @type {import("eslint").FlatConfig[]} */
module.exports = [
  // 1) Core Next.js rules (including Core Web Vitals)
  nextConfig,

  // 2) React’s recommended rules
  pluginReact.configs.recommended,

  // 3) Your custom overrides
  {
    // we’re already pulling in the plugin above
    plugins: {
      react: pluginReact
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // 1) Enforce PascalCase for components
      "react/jsx-pascal-case": [
        "error",
        {
          allowAllCaps: false,
          ignore: [],
          allowLeadingUnderscore: false
        }
      ],
      // 2) Don’t require React in scope for JSX
      "react/react-in-jsx-scope": "off",
      // 3) We’re not using PropTypes everywhere
      "react/prop-types": "off"
    }
  }
];
