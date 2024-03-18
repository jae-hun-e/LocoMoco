/** @type {import('next').NextConfig} */
import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["locomoco-image.s3.ap-northeast-2.amazonaws.com"], // 이곳에 에러에서 hostname 다음 따옴표에 오는 링크를 적으면 된다.
  },
};

const withPWA = withPWAInit({
  dest: "public",
  runtimeCaching
});

export default { ...withPWA, ...nextConfig };

// export default nextConfig;
