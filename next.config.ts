import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.2.2", "localhost", "127.0.0.1"],
  // Generate static pages at build time for all known routes
  staticPageGenerationTimeout: 120,
};

export default nextConfig;
