/**
 * Base path is driven by an env var so the same source builds for either host.
 *
 *   GitHub Pages project subfolder (works today):
 *     NEXT_PUBLIC_BASE_PATH=/norvixco.com/ethan-sons npm run build
 *
 *   Once norvixco.com resolves as a custom domain:
 *     NEXT_PUBLIC_BASE_PATH=/ethan-sons npm run build
 *
 *   Client's own root domain at launch:
 *     npm run build
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> deploys straight to GitHub Pages, no server required.
  output: 'export',
  // Emits /about/index.html so the live URL is /about/ with no .html anywhere.
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // next/image optimisation needs a server; unoptimized keeps the export static.
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
