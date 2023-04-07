// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  // reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 1000,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.50.70",
      },
    ],
  },
};
