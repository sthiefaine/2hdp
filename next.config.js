/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  images: {
    domains: [
      "tmdb.org",
      "image.tmdb.org",
      "themoviedb.org",
      "jjrruaoms5jmeqd5.public.blob.vercel-storage.com",
      "public.blob.vercel-storage.com",
    ],
  },
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
