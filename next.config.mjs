/** @type {import('next').NextConfig} */
// import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'locomoco-image.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

// const withPWA = withPWAInit({
//   dest: 'public',
//   runtimeCaching,
// });

export default nextConfig;
// export default withPWA(nextConfig);
