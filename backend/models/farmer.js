// Farmer Schema for MongoDB (Mongoose)
const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cropType: { type: String, required: true },
  availableStockKg: { type: Number, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
  minDispatchKg: { type: Number, required: true },
  availableSlots: [{
    day: { type: String }, // e.g., 'Monday'
    startHour: { type: Number }, // 0-23
    endHour: { type: Number } // 0-23
  }],
  freshnessScore: { type: Number, default: 1.0 }, // 0-1
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', FarmerSchema);
