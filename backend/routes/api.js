/**
 * API Endpoints for Farmer-Order Matching System
 * - Integrates clustering, matching, profitability, and route optimization modules
 */
const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const router = express.Router();
const Farmer = require('../models/farmer');
const Order = require('../models/order');
const { matchClusterToFarmers } = require('../services/matching');
const { estimateProfitability } = require('../services/profitability');
const { spawn } = require('child_process');

router.use(helmet());

const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: { error: 'Too many requests from this IP' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(apiLimiter);

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation failed', details: errors.array() });
  }
  next();
};

// Cluster orders (calls Python clustering engine)
router.post('/cluster-orders', 
  [
    body('orders').isArray().withMessage('Orders must be an array'),
    body('orders.*.location.lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('orders.*.location.lon').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
    body('orders.*.quantityKg').isFloat({ min: 0.1 }).withMessage('Quantity must be positive'),
    body('orders.*.cropType').isString().isLength({ min: 1 }).withMessage('Crop type required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const orders = req.body.orders;
      
      if (!orders || orders.length === 0) {
        return res.status(400).json({ error: 'No orders provided' });
      }

      const py = spawn('python3', ['./services/clusterOrders.py', JSON.stringify(orders)]);
      let data = '';
      let errorData = '';
      
      py.stdout.on('data', chunk => data += chunk);
      py.stderr.on('data', chunk => errorData += chunk);
      
      py.on('close', (code) => {
        try {
          if (code !== 0) {
            console.error('Python script error:', errorData);
            return res.status(500).json({ error: 'Clustering service failed', details: errorData });
          }
          const result = JSON.parse(data);
          if (result.error) {
            return res.status(500).json({ error: 'Clustering failed', details: result.error });
          }
          res.json({ clusters: result });
        } catch (err) {
          console.error('JSON parse error:', err.message, 'Data:', data);
          res.status(500).json({ error: 'Invalid response from clustering service' });
        }
      });
      
      py.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        res.status(500).json({ error: 'Clustering service unavailable' });
      });
      
    } catch (err) {
      console.error('Cluster orders error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// Match cluster to farmers
router.post('/match-cluster',
  [
    body('clusterOrders').isArray().withMessage('Cluster orders must be an array'),
    body('farmers').isArray().withMessage('Farmers must be an array'),
    body('clusterOrders.*.quantityKg').isFloat({ min: 0.1 }).withMessage('Invalid quantity'),
    body('farmers.*.cropType').isString().isLength({ min: 1 }).withMessage('Crop type required')
  ],
  validateRequest,
  async (req, res) => {
    try {
      const { clusterOrders, farmers } = req.body;
      
      if (!clusterOrders || clusterOrders.length === 0) {
        return res.status(400).json({ error: 'No cluster orders provided' });
      }
      
      if (!farmers || farmers.length === 0) {
        return res.status(400).json({ error: 'No farmers provided' });
      }

      const assignments = await matchClusterToFarmers(clusterOrders, farmers);
      res.json({ assignments });
    } catch (err) {
      console.error('Match cluster error:', err);
      res.status(500).json({ error: 'Matching failed', details: err.message });
    }
  }
);

// Profitability estimation
router.post('/estimate-profit',
  [
    body('assignment.assignedQty').isFloat({ min: 0.1 }).withMessage('Invalid assigned quantity'),
    body('assignment.location.lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('assignment.location.lon').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude'),
    body('clusterLocation.lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid cluster latitude'),
    body('clusterLocation.lon').isFloat({ min: -180, max: 180 }).withMessage('Invalid cluster longitude'),
    body('basePricePerKg').isFloat({ min: 0 }).withMessage('Base price must be positive'),
    body('transportRatePerKmPerKg').isFloat({ min: 0 }).withMessage('Transport rate must be positive'),
    body('laborCostPerKg').isFloat({ min: 0 }).withMessage('Labor cost must be positive')
  ],
  validateRequest,
  (req, res) => {
    try {
      const { assignment, clusterLocation, basePricePerKg, transportRatePerKmPerKg, laborCostPerKg } = req.body;
      
      const result = estimateProfitability(assignment, clusterLocation, basePricePerKg, transportRatePerKmPerKg, laborCostPerKg);
      res.json(result);
    } catch (err) {
      console.error('Profitability estimation error:', err);
      res.status(500).json({ error: 'Profitability estimation failed', details: err.message });
    }
  }
);

// Route optimization (calls Python route optimizer)
router.post('/optimize-route',
  [
    body('locations').isArray({ min: 2 }).withMessage('At least 2 locations required'),
    body('locations.*.lat').isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude'),
    body('locations.*.lon').isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude')
  ],
  validateRequest,
  (req, res) => {
    try {
      const { locations } = req.body;
      
      if (!locations || locations.length < 2) {
        return res.status(400).json({ error: 'At least 2 locations required for route optimization' });
      }

      const py = spawn('python3', ['./services/routeOptimizer.py', JSON.stringify(locations)]);
      let data = '';
      let errorData = '';
      
      py.stdout.on('data', chunk => data += chunk);
      py.stderr.on('data', chunk => errorData += chunk);
      
      py.on('close', (code) => {
        try {
          if (code !== 0) {
            console.error('Python script error:', errorData);
            return res.status(500).json({ error: 'Route optimization service failed', details: errorData });
          }
          const result = JSON.parse(data);
          if (result.error) {
            return res.status(500).json({ error: 'Route optimization failed', details: result.error });
          }
          res.json({ route: result });
        } catch (err) {
          console.error('JSON parse error:', err.message, 'Data:', data);
          res.status(500).json({ error: 'Invalid response from route optimization service' });
        }
      });
      
      py.on('error', (err) => {
        console.error('Failed to start Python process:', err);
        res.status(500).json({ error: 'Route optimization service unavailable' });
      });
      
    } catch (err) {
      console.error('Route optimization error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
);

module.exports = router;
