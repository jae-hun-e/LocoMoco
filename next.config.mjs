/** @type {import('next').NextConfig} */
import withPWAInit, { runtimeCaching } from '@ducanh2912/next-pwa';
// const nextConfig = {
//   reactStrictMode: false,
// };

const withPWA = withPWAInit({
  dest: "public",
  runtimeCaching
});

export default withPWA;

// export default nextConfig;
