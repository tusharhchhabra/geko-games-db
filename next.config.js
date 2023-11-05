/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: "/games",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["images.igdb.com"],
  },
};

module.exports = nextConfig;
