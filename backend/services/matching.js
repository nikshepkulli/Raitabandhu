/**
 * Matching & Load Balancing Service
 * - Matches clustered orders to farmers based on stock, location, and min dispatch quantity
 * - Splits load across multiple farmers if needed
 * - Prioritizes freshness and route efficiency
 */
const Farmer = require('../models/farmer');
const haversine = require('haversine-distance');

/**
 * Match orders in a cluster to farmers
 * @param {Array} orders - Array of order objects in a cluster
 * @param {Array} farmers - Array of farmer objects
 * @returns {Array} assignments - [{farmer, assignedOrders, totalQuantity}]
 */
async function matchClusterToFarmers(orders, farmers) {
  // Aggregate total required quantity
  const totalQty = orders.reduce((sum, o) => sum + o.quantityKg, 0);
  const cropType = orders[0].cropType;
  const clusterLocation = orders[0].location;

  // Filter farmers by crop type, available stock, and min dispatch
  let eligibleFarmers = farmers.filter(f =>
    f.cropType === cropType &&
    f.availableStockKg >= f.minDispatchKg &&
    f.availableStockKg > 0
  );

  // Sort by proximity and freshness
  eligibleFarmers.sort((a, b) => {
    const distA = haversine(a.location, clusterLocation);
    const distB = haversine(b.location, clusterLocation);
    if (a.freshnessScore !== b.freshnessScore) {
      return b.freshnessScore - a.freshnessScore;
    }
    return distA - distB;
  });

  // Assign orders to farmers
  let assignments = [];
  let remainingQty = totalQty;
  for (let farmer of eligibleFarmers) {
    if (remainingQty <= 0) break;
    let assignQty = Math.min(farmer.availableStockKg, remainingQty);
    if (assignQty < farmer.minDispatchKg) continue;
    assignments.push({
      farmerId: farmer._id,
      assignedQty: assignQty,
      orders: orders.map(o => o._id),
      location: farmer.location
    });
    remainingQty -= assignQty;
  }
  return assignments;
}

module.exports = { matchClusterToFarmers };
