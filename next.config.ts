import type { NextConfig } from "next";

const imageUrl = process.env["IMAGE_URL"];
if (!imageUrl) {
  console.error('ยังไม่ได้ใส่ link รูปใน env');
  throw new Error("ยังไม่ได้ใส่ link รูปใน env");
}

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    // อนุญาตให้ next/image โหลดภาพหน้าจอผลงานจาก Cloudflare R2
    remotePatterns: [{ protocol: "https", hostname: imageUrl }],
  },
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
