/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      '@google-cloud/vertexai': 'commonjs @google-cloud/vertexai',
    });

    return config;
  },
};

module.exports = nextConfig;