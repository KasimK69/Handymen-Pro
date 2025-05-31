// SPA redirect script for Vercel deployment
(function() {
  // This script handles SPA routing for direct URL access
  // Only run this script if we're on a page that's not the root
  if (window.location.pathname !== '/' && 
      window.location.pathname !== '/index.html' && 
      !window.location.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|json)$/)) {
    
    // Store the current URL path for after the app loads
    sessionStorage.setItem('redirectPath', window.location.pathname);
    
    // Check if this is a direct page load (not a client-side navigation)
    if (document.referrer === '') {
      console.log('Direct URL access detected, handling SPA routing...');
    }
  }
})();
