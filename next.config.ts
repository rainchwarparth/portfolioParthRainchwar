import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["192.168.2.2", "localhost", "127.0.0.1"],
};

export default nextConfig;
