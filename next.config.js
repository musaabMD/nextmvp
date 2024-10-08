const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      // NextJS <Image> component needs to whitelist domains for src={}
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "images.unsplash.com",
      "logos-world.net",
      "m.media-amazon.com",
      "static.tvtropes.org", // Added domain
    ],
  },
};

module.exports = nextConfig;
