# Farmer-Order Matching API Documentation

## Overview
This API provides endpoints for clustering consumer orders, matching them to farmers, estimating profitability, and optimizing delivery routes.

---

## Endpoints

### 1. Cluster Orders
**POST** `/api/cluster-orders`
- **Description:** Groups orders by location and delivery window using AI clustering.
- **Body:**
```json
{
  "orders": [
    {
      "location": { "lat": 12.34, "lon": 56.78 },
      "deliveryWindow": { "start": "2025-08-06T09:00:00Z", "end": "2025-08-06T12:00:00Z" },
      "quantityKg": 100,
      "cropType": "rice"
    }
  ]
}
```
- **Response:**
```json
{
  "clusters": {
    "0": {
      "orders": [...],
      "totalQuantity": 200,
      "timeSlot": { "start": "...", "end": "..." }
    }
  }
}
```

---

### 2. Match Cluster to Farmers
**POST** `/api/match-cluster`
- **Description:** Matches clustered orders to eligible farmers.
- **Body:**
```json
{
  "clusterOrders": [...],
  "farmers": [...]
}
```
- **Response:**
```json
{
  "assignments": [
    {
      "farmerId": "...",
      "assignedQty": 150,
      "orders": ["..."],
      "location": { "lat": 12.34, "lon": 56.78 }
    }
  ]
}
```

---

### 3. Estimate Profitability
**POST** `/api/estimate-profit`
- **Description:** Estimates profit for a farmer-order assignment.
- **Body:**
```json
{
  "assignment": { ... },
  "clusterLocation": { "lat": 12.34, "lon": 56.78 },
  "basePricePerKg": 30,
  "transportRatePerKmPerKg": 2,
  "laborCostPerKg": 1
}
```
- **Response:**
```json
{
  "profit": 500,
  "costBreakdown": {
    "transportCost": 100,
    "laborCost": 50,
    "revenue": 650,
    "totalCost": 150
  },
  "isProfitable": true
}
```

---

### 4. Optimize Route
**POST** `/api/optimize-route`
- **Description:** Returns optimal delivery route for farmer and drop locations.
- **Body:**
```json
{
  "locations": [
    { "lat": 12.34, "lon": 56.78 },
    { "lat": 13.45, "lon": 57.89 }
  ]
}
```
- **Response:**
```json
{
  "route": [0, 1, 2]
}
```

---

## Error Handling
All endpoints return HTTP 500 with an error message if processing fails.

---

## Environment Variables
See `.env.example` for required keys (MongoDB, Google Maps, etc).

---

## Usage
Integrate these endpoints with your frontend or automation scripts for smart farmer-order matching and logistics.
