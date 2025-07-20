/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["raw.githubusercontent.com"],
    formats: ["image/webp", "image/avif"],
  },
  experimental: {
    optimizePackageImports: ["styled-components"],
  },
};

module.exports = nextConfig;
