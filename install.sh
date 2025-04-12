#!/bin/bash

echo "🚜 Starting Raitabandhu Setup..."

# Set error flag
set -e

# Backend
echo "🔧 Installing backend dependencies..."
cd backend
npm install
cp .env.example .env 2>/dev/null || echo "⚠️ No .env.example found for backend"

# Frontend
echo "🔧 Installing frontend dependencies..."
cd ../frontend
npm install
cp .env.example .env 2>/dev/null || echo "⚠️ No .env.example found for frontend"

# Done
cd ..
echo "✅ Installation Complete!"
echo "➡️ To start backend: cd backend && npm start"
echo "➡️ To start frontend: cd frontend && npm run dev"
