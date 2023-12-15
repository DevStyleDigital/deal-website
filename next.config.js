/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'txbzeyhyrceumtbddgye.supabase.co' }],
  },
};

module.exports = nextConfig;
