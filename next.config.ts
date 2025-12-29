import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "docs",
  // Required for GitHub Pages subdirectory deployment (username.github.io/Asdf/)
  basePath: "/Asdf",
  assetPrefix: "/Asdf",
  images: {
    unoptimized: true,
  },
  // Enable trailing slash for GitHub Pages compatibility
  trailingSlash: true,
};

export default nextConfig;
