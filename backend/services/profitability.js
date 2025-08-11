/**
 * Profitability Estimator Module
 * - Estimates delivery cost, labor, and profit for each farmer-order assignment
 * - Only allows orders if projected profit is positive
 */
const haversine = require('haversine-distance');

/**
 * Estimate profitability for a farmer assignment
 * @param {Object} assignment - {farmerId, assignedQty, location, orders}
 * @param {Object} clusterLocation - {lat, lon}
 * @param {Number} basePricePerKg - Base price per kg for crop
 * @param {Number} transportRatePerKmPerKg - ₹/km/kg
 * @param {Number} laborCostPerKg - ₹/kg
 * @returns {Object} {profit, costBreakdown, isProfitable}
 */
function estimateProfitability(assignment, clusterLocation, basePricePerKg, transportRatePerKmPerKg, laborCostPerKg) {
  // Calculate distance (km)
  const distKm = haversine(assignment.location, clusterLocation) / 1000;
  const transportCost = distKm * assignment.assignedQty * transportRatePerKmPerKg;
  const laborCost = assignment.assignedQty * laborCostPerKg;
  const revenue = assignment.assignedQty * basePricePerKg;
  const totalCost = transportCost + laborCost;
  const profit = revenue - totalCost;
  return {
    profit,
    costBreakdown: {
      transportCost,
      laborCost,
      revenue,
      totalCost
    },
    isProfitable: profit > 0
  };
}

module.exports = { estimateProfitability };
