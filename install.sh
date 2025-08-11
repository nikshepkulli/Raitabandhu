#!/bin/bash

set -e

echo "🌾 Raitabandhu Setup Script"
echo "=========================="

# Check prerequisites
echo "Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Aborting." >&2; exit 1; }
command -v python3 >/dev/null 2>&1 || { echo "❌ Python 3 is required but not installed. Aborting." >&2; exit 1; }
command -v mongod >/dev/null 2>&1 || { echo "⚠️  MongoDB not found. Make sure it's installed and running." >&2; }

echo "✅ Prerequisites check passed"

# Install Python dependencies
echo "Installing Python dependencies..."
pip3 install -r requirements.txt || { echo "❌ Failed to install Python dependencies" >&2; exit 1; }
echo "✅ Python dependencies installed"

# Install Backend Dependencies
echo "Installing Backend Dependencies..."
cd backend
npm install || { echo "❌ Failed to install backend dependencies" >&2; exit 1; }
cp .env.example .env 2>/dev/null || echo "⚠️ No .env.example found for backend"
echo "✅ Backend dependencies installed"

# Install Frontend Dependencies
echo "Installing Frontend Dependencies..."
cd ../frontend
npm install || { echo "❌ Failed to install frontend dependencies" >&2; exit 1; }
echo "✅ Frontend dependencies installed"

cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Edit backend/.env with your configuration"
echo "2. Start MongoDB: sudo systemctl start mongod"
echo "3. Start backend: cd backend && npm start"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "Or use Docker: docker-compose up -d"
