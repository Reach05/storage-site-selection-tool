/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  transpilePackages: ['@arcgis/core'],

  webpack(config, { isServer }) {
    // Null-load any ArcGIS CSS so Next’s loader never tries to parse it
    config.module.rules.unshift({
      test: /\.css$/,
      include: /@arcgis\/core\/assets/,
      use: 'null-loader',
    });

    // On server build, externalize ArcGIS JS entirely
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        /@arcgis\/core/,
      ];
    }

    // ← Missing return was preventing your rule from taking effect
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/.well-known/appspecific/:file',
        destination: '/empty.json',
      },
    ];
  },
};

export default nextConfig;