// Jest test cases for Farmer-Order Matching API
const request = require('supertest');
const express = require('express');
const apiRouter = require('../routes/api');

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

describe('Farmer-Order Matching API', () => {
  it('clusters orders', async () => {
    const res = await request(app)
      .post('/api/cluster-orders')
      .send({ orders: [
        { location: { lat: 12.34, lon: 56.78 }, deliveryWindow: { start: '2025-08-06T09:00:00Z', end: '2025-08-06T12:00:00Z' }, quantityKg: 100, cropType: 'rice' }
      ] });
    expect(res.statusCode).toBe(200);
    expect(res.body.clusters).toBeDefined();
  });

  it('matches cluster to farmers', async () => {
    const res = await request(app)
      .post('/api/match-cluster')
      .send({ clusterOrders: [{ quantityKg: 100, cropType: 'rice', location: { lat: 12.34, lon: 56.78 } }], farmers: [{ _id: 'f1', cropType: 'rice', availableStockKg: 200, minDispatchKg: 50, location: { lat: 12.35, lon: 56.79 }, freshnessScore: 1.0 }] });
    expect(res.statusCode).toBe(200);
    expect(res.body.assignments).toBeDefined();
  });

  it('estimates profitability', async () => {
    const res = await request(app)
      .post('/api/estimate-profit')
      .send({ assignment: { assignedQty: 100, location: { lat: 12.34, lon: 56.78 } }, clusterLocation: { lat: 12.35, lon: 56.79 }, basePricePerKg: 30, transportRatePerKmPerKg: 2, laborCostPerKg: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.profit).toBeDefined();
    expect(typeof res.body.isProfitable).toBe('boolean');
  });

  it('optimizes route', async () => {
    const res = await request(app)
      .post('/api/optimize-route')
      .send({ locations: [ { lat: 12.34, lon: 56.78 }, { lat: 13.45, lon: 57.89 } ] });
    expect(res.statusCode).toBe(200);
    expect(res.body.route).toBeDefined();
    expect(Array.isArray(res.body.route)).toBe(true);
  });
});
