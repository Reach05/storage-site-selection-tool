// next.config.js
import webpack from "webpack";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer, webpack: wp }) {
    // 1. Stub ResizeObserver on the server to prevent SSR errors
    if (isServer) {
      config.plugins.push(
        new wp.DefinePlugin({
          "global.ResizeObserver": `(class {
             observe() {}
             unobserve() {}
             disconnect() {}
           })`,
        })
      );
    }

    // 2. Silence specific development warnings
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push(
      // ArcGIS CSS cache‐serialization warning
      (warning) =>
        warning.message?.includes("Skipped not serializable cache item")
    );
    config.ignoreWarnings.push(
      // Autoprefixer “start value has mixed support” warning
      (warning) => warning.message?.includes("start value has mixed support")
    );

    return config;
  },
};

export default nextConfig;
 