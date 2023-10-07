/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'vmmjxgapxlkcagzaouti.supabase.co' }],
  },
};

module.exports = nextConfig;
