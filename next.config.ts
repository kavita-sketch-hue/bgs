import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  experimental: {
    serverExternalPackages: ["@react-pdf/renderer"],
  },
};

export default nextConfig;
