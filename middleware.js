// Middleware for Vercel Edge Functions
export default function middleware(request) {
  const url = new URL(request.url);
  
  // Skip middleware for static assets and API routes
  if (
    url.pathname.startsWith('/assets/') || 
    url.pathname.startsWith('/api/') ||
    url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$/)
  ) {
    return;
  }
  
  // For all other routes, rewrite to index.html
  return new Response(null, {
    status: 200,
    headers: {
      'x-middleware-rewrite': url.origin
    }
  });
}
