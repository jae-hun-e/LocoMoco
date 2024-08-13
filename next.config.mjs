/** @type {import('next').NextConfig} */
import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'locomoco-bucket-free.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  reactStrictMode: false,
};

const withPWA = withPWAInit({
  dest: 'public',
  runtimeCaching,
});

export default withPWA(nextConfig);
