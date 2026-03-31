import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@react-pdf/renderer"],
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
