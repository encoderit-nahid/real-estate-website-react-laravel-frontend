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
    locales: ["en", "pt"],
    defaultLocale: "pt",
    fallbackLng: 'pt', // Fallback language
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://api.lokkan.com.br/storage",
      },
    ],
  },

  // i18n: {
  // 	locales: ['en-US', 'pt-br'],
  // 	defaultLocale: 'en-US',
  // },
};
