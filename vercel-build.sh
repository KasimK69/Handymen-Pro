#!/bin/bash

# Build the project
npm run build

# Copy index.html to 404.html for SPA routing
cp dist/index.html dist/404.html

# Create a routes.json file in the dist directory
cat > dist/_routes.json << EOL
{
  "version": 1,
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "status": 200,
      "dest": "/index.html"
    }
  ]
}
EOL

echo "Vercel build completed successfully!"
