// postcss.config.js

module.exports = {
  plugins: {
    // Fixes known Flexbox bugs
    "postcss-flexbugs-fixes": {},

    // Replace any "justify-content: start" with "justify-content: flex-start"
    "postcss-replace": {
      pattern: /justify-content:\s*start/g,
      data: {
        replaceAll: "justify-content: flex-start",
      },
    },

    // Run Autoprefixer as usual
    autoprefixer: {
      overrideBrowserslist: [
        "last 2 Chrome versions",
        "last 2 Edge versions",
        "last 2 Firefox versions",
        "last 2 Safari versions",
        "not dead",
      ],
      flexbox: "no-2009",
    },
  },
};
