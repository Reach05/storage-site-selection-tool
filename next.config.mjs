// next.config.mjs
import webpack from "webpack";

/** @type {import('next').NextConfig} */
export default {
  // These must match exactly how you open your browser in dev:
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://10.211.55.7:3000"
    // If you ever run `npm run dev:https`, also add:
    // "https://localhost:3000",
    // "https://10.211.55.7:3000"
  ],

  webpack(config, { isServer, webpack: wp }) {
    if (isServer) {
      // Stub out ResizeObserver on the Node/server side so SSR won’t crash:
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

    // Suppress two known nonfatal warnings (ArcGIS CSS + Autoprefixer):
    config.ignoreWarnings = config.ignoreWarnings || [];
    config.ignoreWarnings.push((warning) =>
      warning.message?.includes("Skipped not serializable cache item")
    );
    config.ignoreWarnings.push((warning) =>
      warning.message?.includes("start value has mixed support")
    );

    return config;
  },
};
