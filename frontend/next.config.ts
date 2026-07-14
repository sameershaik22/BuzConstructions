import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern WebP/AVIF formats automatically (Next.js converts on-the-fly)
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 60 days
    minimumCacheTTL: 5184000,
    // Allowed image sizes for responsive srcsets
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    // Allow local images from public folder
    remotePatterns: [],
  },
};

export default nextConfig;
