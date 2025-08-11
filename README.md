# Raitabandhu - Farmer-Order Matching System

A full-stack application that connects farmers with consumers through intelligent order clustering, matching, and route optimization.

## 🌾 Features

- **Order Clustering**: Groups orders geographically and by delivery time using ML algorithms
- **Smart Matching**: Matches clustered orders to farmers based on stock, location, and capacity
- **Profitability Analysis**: Estimates costs and profits for each farmer assignment
- **Route Optimization**: Optimizes delivery routes using Google OR-Tools
- **Real-time API**: RESTful backend with comprehensive validation
- **Modern Frontend**: React-based user interface with responsive design

## 🏗️ Architecture

```
Raitabandhu/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas (Farmer, Order)
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic & Python integrations
│   ├── __tests__/          # API tests
│   └── server.js           # Express server setup
├── frontend/               # React application
│   ├── src/                # React components and assets
│   ├── pages/              # Page components
│   └── public/             # Static assets
└── docker-compose.yml      # Container orchestration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.8+
- MongoDB 6.0+
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Raitabandhu.git
   cd Raitabandhu
   ```

2. **Install Python dependencies**
   ```bash
   pip install scikit-learn numpy ortools
   ```

3. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Using Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/raitabandhu
JWT_SECRET=your_strong_jwt_secret_min_32_chars_long
FRONTEND_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

## 📚 API Documentation

### Core Endpoints

#### POST /api/cluster-orders
Groups orders by location and delivery time.

**Request:**
```json
{
  "orders": [
    {
      "location": { "lat": 12.34, "lon": 56.78 },
      "deliveryWindow": {
        "start": "2025-08-06T09:00:00Z",
        "end": "2025-08-06T12:00:00Z"
      },
      "quantityKg": 100,
      "cropType": "rice"
    }
  ]
}
```

#### POST /api/match-cluster
Matches clustered orders to available farmers.

**Request:**
```json
{
  "clusterOrders": [...],
  "farmers": [
    {
      "cropType": "rice",
      "availableStockKg": 200,
      "minDispatchKg": 50,
      "location": { "lat": 12.35, "lon": 56.79 },
      "freshnessScore": 1.0
    }
  ]
}
```

#### POST /api/estimate-profit
Calculates profitability for farmer assignments.

#### POST /api/optimize-route
Optimizes delivery routes for multiple locations.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🛡️ Security Features

- Input validation and sanitization
- Rate limiting
- Helmet.js security headers
- Environment-based configuration
- Non-root Docker containers
- CORS protection

## 🔍 Code Quality

### Linting
```bash
# Backend
cd backend && npm run lint

# Frontend
cd frontend && npm run lint
```

### Fix Issues
```bash
# Backend
cd backend && npm run lint:fix

# Frontend
cd frontend && npm run lint:fix
```

## 🐛 Troubleshooting

### Common Issues

1. **Python script errors**: Ensure Python dependencies are installed
   ```bash
   pip install scikit-learn numpy ortools
   ```

2. **MongoDB connection**: Verify MongoDB is running and connection string is correct

3. **Port conflicts**: Check if ports 3000, 5000, or 27017 are already in use

4. **Docker issues**: Ensure Docker daemon is running and you have sufficient permissions

### Debug Mode

Set `NODE_ENV=development` for detailed error messages.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [scikit-learn](https://scikit-learn.org/) for machine learning algorithms
- [Google OR-Tools](https://developers.google.com/optimization) for route optimization
- [MongoDB](https://www.mongodb.com/) for data storage
- [React](https://reactjs.org/) for frontend framework

## 📞 Support

For support, email support@raitabandhu.com or join our Slack channel.

---

Made with 🌾 by the Raitabandhu Team