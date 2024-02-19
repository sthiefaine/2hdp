/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/2hdp/rss",
        destination: "https://feed.ausha.co/Loa7srdWGm1b",
      },
    ];
  },
};

module.exports = nextConfig;
