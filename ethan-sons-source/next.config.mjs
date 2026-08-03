/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> deploys straight to GitHub Pages, no server required.
  output: 'export',
  // Emits /about/index.html so the live URL is /about/ with no .html anywhere.
  trailingSlash: true,
  images: {
    // next/image optimisation needs a server; unoptimized keeps the export static.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
