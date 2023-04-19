// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 1000,
  output:"standalone",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://127.0.0.1",
      },
    ],
  },
};

