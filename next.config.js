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
  output: "standalone",
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "http://192.168.50.70",
      },
    ],
  },

  // i18n: {
  // 	locales: ['en-US', 'pt-br'],
  // 	defaultLocale: 'en-US',
  // },
};
