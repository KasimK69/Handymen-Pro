import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Handle WhatsApp redirect if needed
const handleRedirectFromWhatsApp = () => {
  // Check if there's a stored redirect path from WhatsApp WebView
  const redirectPath = sessionStorage.getItem('redirectPath');
  const urlParams = new URLSearchParams(window.location.search);
  const fromWhatsApp = urlParams.get('from') === 'whatsapp';
  const redirectParam = urlParams.get('redirect');

  // If we have a redirect parameter from WhatsApp, use that
  if (fromWhatsApp && redirectParam) {
    // Store it for after the app loads
    sessionStorage.setItem('redirectPath', redirectParam);
    // Clean up the URL
    window.history.replaceState({}, document.title, '/');
  }

  // The actual navigation will happen in App.tsx with the router
};

// Call the handler before rendering
handleRedirectFromWhatsApp();

// Add event listener for history changes to prevent 404s on refresh
window.addEventListener('popstate', function(event) {
  // Prevent the default behavior which might cause a page reload
  event.preventDefault();
  // The router will handle the navigation
});

// Render the app
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
