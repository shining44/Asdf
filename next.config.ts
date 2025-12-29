import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Disable trailing slash to match default GitHub Pages behavior
  trailingSlash: true,
};

export default nextConfig;
