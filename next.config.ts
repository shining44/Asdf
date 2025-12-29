import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  images: {
    unoptimized: true,
  },
  // Enable trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
