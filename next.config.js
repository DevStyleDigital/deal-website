/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'zszwrcpojepwokcjhlfz.supabase.co' }],
  },
};

module.exports = nextConfig;
