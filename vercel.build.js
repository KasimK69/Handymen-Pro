// This script runs during Vercel build to ensure proper routing
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy index.html to 404.html
function setupSPAFallback() {
  try {
    // Path to the build directory
    const buildDir = path.resolve(__dirname, 'dist');
    
    // Check if the build directory exists
    if (!fs.existsSync(buildDir)) {
      console.log('Build directory not found. Make sure to run build first.');
      return;
    }
    
    // Copy index.html to 404.html to handle client-side routing
    const indexPath = path.join(buildDir, 'index.html');
    const notFoundPath = path.join(buildDir, '404.html');
    
    if (fs.existsSync(indexPath)) {
      fs.copyFileSync(indexPath, notFoundPath);
      console.log('Created 404.html for SPA routing');
    } else {
      console.log('index.html not found in build directory');
    }
  } catch (error) {
    console.error('Error setting up SPA fallback:', error);
  }
}

// Run the setup
setupSPAFallback();
