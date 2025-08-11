// Order Schema for MongoDB (Mongoose)
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  consumerName: { type: String, required: true },
  cropType: { type: String, required: true },
  quantityKg: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  deliveryWindow: {
    start: { type: Date, required: true },
    end: { type: Date, required: true }
  },
  status: { type: String, enum: ['pending', 'matched', 'delivered'], default: 'pending' },
  clusterId: { type: String }, // For clustering
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
