// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // allow your dev machine (or LAN IP) to load __next/* HMR & asset files
  allowedDevOrigins: [
    'http://localhost:3000',    // default Next dev
    'http://10.211.55.7:3000',  // your Edge/WebView host if different
  ],

  // expose these to the browser via process.env.YOUR_VAR
  env: {
    HEATMAP_SERVICE_URL: process.env.HEATMAP_SERVICE_URL,
    DRIVETIME_SERVICE_URL: process.env.DRIVETIME_SERVICE_URL,
    FLOODZONE_SERVICE_URL: process.env.FLOODZONE_SERVICE_URL,
  },

  // mirror your Vercel rewrites locally
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ]
  },

  // (optional) Typescript settings
  typescript: {
    // Fail build on type errors (set to true to ignore)
    ignoreBuildErrors: false
  },

  // (optional) if you need to tweak webpack—for example to null-load Sass in node_modules:
  // webpack(config, { isServer }) {
  //   // example: exclude .scss from server bundle
  //   if (isServer) {
  //     config.module.rules.push({
  //       test: /\.scss$/,
  //       use: 'null-loader'
  //     });
  //   }
  //   return config;
  // }
};

export default nextConfig;
