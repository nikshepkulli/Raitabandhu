// Matching and profitability logic for farmer-order assignment
const Farmer = require('../models/Farmer');
const Order = require('../models/Order');

// Haversine distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Estimate delivery cost (₹/km * distance * weight)
function estimateDeliveryCost(distanceKm, weightKg, ratePerKm=10) {
  return distanceKm * ratePerKm * (weightKg/100);
}

// Main matching function
async function matchClusterToFarmers(clusterOrders, cropType) {
  // Get all farmers with enough stock of cropType
  const farmers = await Farmer.find({ 'crops.cropType': cropType });
  // Aggregate order location (centroid)
  const avgLat = clusterOrders.reduce((s,o) => s+o.location.lat, 0) / clusterOrders.length;
  const avgLon = clusterOrders.reduce((s,o) => s+o.location.lon, 0) / clusterOrders.length;
  const totalQty = clusterOrders.reduce((s,o) => s+o.quantityKg, 0);
  // Find best farmer(s)
  let assignments = [];
  for (const farmer of farmers) {
    const crop = farmer.crops.find(c => c.cropType === cropType);
    if (!crop) continue;
    if (crop.availableStockKg >= totalQty && crop.minDispatchKg <= totalQty) {
      // Check profitability
      const dist = haversine(farmer.location.lat, farmer.location.lon, avgLat, avgLon);
      const deliveryCost = estimateDeliveryCost(dist, totalQty);
      const basePrice = 30 * totalQty; // Example base price
      const profit = basePrice - deliveryCost - 100; // 100 = labor/other
      if (profit > 0) {
        assignments.push({ farmerId: farmer._id, quantity: totalQty, profit, deliveryCost });
        break;
      }
    }
  }
  // If no single farmer, split load
  if (assignments.length === 0) {
    let qtyLeft = totalQty;
    for (const farmer of farmers) {
      const crop = farmer.crops.find(c => c.cropType === cropType);
      if (!crop) continue;
      if (crop.availableStockKg >= crop.minDispatchKg && qtyLeft > 0) {
        const assignQty = Math.min(qtyLeft, crop.availableStockKg);
        if (assignQty < crop.minDispatchKg) continue;
        const dist = haversine(farmer.location.lat, farmer.location.lon, avgLat, avgLon);
        const deliveryCost = estimateDeliveryCost(dist, assignQty);
        const basePrice = 30 * assignQty;
        const profit = basePrice - deliveryCost - 100;
        if (profit > 0) {
          assignments.push({ farmerId: farmer._id, quantity: assignQty, profit, deliveryCost });
          qtyLeft -= assignQty;
        }
      }
    }
  }
  return assignments;
}

module.exports = { matchClusterToFarmers };
