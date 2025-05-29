import withTM from 'next-transpile-modules'

// force Next.js to transpile these ESM packages
const nextConfig = withTM([
  '@arcgis/core',
  'esri-loader'
])({
  reactStrictMode: true,
  webpack(config) {
    config.ignoreWarnings = [
      (warning) =>
        warning.message?.includes('start value has mixed support'),
    ];
    return config;
  },
});

export default nextConfig;