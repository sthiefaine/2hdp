/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "tmdb.org",
      "image.tmdb.org",
      "themoviedb.org",
      "jjrruaoms5jmeqd5.public.blob.vercel-storage.com",
      "public.blob.vercel-storage.com",
      "2hdp.fr",
      "www.2hdp.fr",
      "uploadfiles.clairdev.com",
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
