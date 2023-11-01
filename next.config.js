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
};

module.exports = nextConfig;
