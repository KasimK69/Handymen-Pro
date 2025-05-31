// vercel-build.mjs - ESM module for Vercel build process
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy index.html to 404.html and other SPA routing files
async function setupSPARouting() {
  try {
    console.log('Setting up SPA routing for Vercel deployment...');
    
    // Path to the build directory
    const buildDir = path.resolve(__dirname, 'dist');
    
    // Check if the build directory exists
    if (!fs.existsSync(buildDir)) {
      console.error('Build directory not found. Make sure to run build first.');
      process.exit(1);
    }
    
    // Create necessary files for SPA routing
    const indexPath = path.join(buildDir, 'index.html');
    
    if (!fs.existsSync(indexPath)) {
      console.error('index.html not found in build directory');
      process.exit(1);
    }
    
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Create 404.html (essential for SPA routing)
    fs.writeFileSync(path.join(buildDir, '404.html'), indexContent);
    console.log('✅ Created 404.html');
    
    // Create 200.html (used by some hosting providers)
    fs.writeFileSync(path.join(buildDir, '200.html'), indexContent);
    console.log('✅ Created 200.html');
    
    // Create _redirects file (used by Netlify and some other providers)
    fs.writeFileSync(
      path.join(buildDir, '_redirects'),
      '/* /index.html 200'
    );
    console.log('✅ Created _redirects file');
    
    // Create vercel.json in the build output
    const vercelConfig = {
      "version": 2,
      "routes": [
        {
          "src": "^/assets/(.*)",
          "headers": { "cache-control": "public, max-age=31536000, immutable" },
          "continue": true
        },
        { "handle": "filesystem" },
        { "src": "^/api/(.*)$", "dest": "/api/$1" },
        { "src": "^/(.*)", "dest": "/index.html" }
      ],
      "cleanUrls": true,
      "trailingSlash": false
    };
    
    fs.writeFileSync(
      path.join(buildDir, 'vercel.json'),
      JSON.stringify(vercelConfig, null, 2)
    );
    console.log('✅ Created vercel.json in build output');
    
    console.log('✅ SPA routing setup complete!');
  } catch (error) {
    console.error('Error setting up SPA routing:', error);
    process.exit(1);
  }
}

// Run the setup
setupSPARouting();
