// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

module.exports = {
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  reactStrictMode: true,
  swcMinify: true,
  // exportPathMap: async function () /* defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }*/
  // {
  //   return {
  //     "/": { page: "/" },
  //     "/advertise": { page: "/advertise" },
  //     "/broker": { page: "/broker" },
  //     "/owner": { page: "/owner" },
  //     "/property_view": { page: "/property_view" },
  //   };
  // },
};
