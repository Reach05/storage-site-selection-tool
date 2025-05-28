/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    // ignore the "start value has mixed support" warning from @arcgis core CSS
    config.ignoreWarnings = [
      (warning) =>
        warning.module &&
        warning.message?.includes('start value has mixed support'),
    ];
    return config;
  },
};git