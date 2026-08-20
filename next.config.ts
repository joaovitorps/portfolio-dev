import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.VERCEL_BLOB_DOMAIN!,
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_GITHUB_AVATARS_DOMAIN!,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
