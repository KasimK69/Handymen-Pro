// next.config.js
module.exports = {
  // Tell Next.js this is not a Next.js project
  reactStrictMode: true,
  // Configure rewrites for SPA routing
  async rewrites() {
    return [
      {
        // Rewrite everything to `index.html`
        source: '/:path*',
        destination: '/',
      },
    ];
  },
  // Configure headers for caching and security
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
      {
        // Apply cache headers to static assets
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};
