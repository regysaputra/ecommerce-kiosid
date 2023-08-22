/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  i18n: {
    locales: ['id'],
    defaultLocale: 'id'
  }
}

module.exports = nextConfig
