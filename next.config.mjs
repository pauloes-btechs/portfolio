/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Security hardening: the site uses no next/image, so the Image
  // Optimization API (/_next/image) is pure attack surface (see
  // GHSA-2xp9-vwfh-vxw4). Kept disabled on Next 16; re-enable only if
  // next/image is ever adopted.
  images: { unoptimized: true },
};

export default nextConfig;
