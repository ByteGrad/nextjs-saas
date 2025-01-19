import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bytegrad.com",
      },
    ],
  },
};

export default nextConfig;
