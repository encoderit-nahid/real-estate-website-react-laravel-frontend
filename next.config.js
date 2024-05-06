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
        protocol: "https",
        hostname: "https://api.lokkan.site/storage",
      },
    ],
  },

  // i18n: {
  // 	locales: ['en-US', 'pt-br'],
  // 	defaultLocale: 'en-US',
  // },
};
