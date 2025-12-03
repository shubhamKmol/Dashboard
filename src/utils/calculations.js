// src/utils/calculations.js

export function getTotalVolume(merchants) {
  return merchants.reduce((sum, m) => sum + m.monthlyVolume, 0);
}

export function getActiveMerchantCount(merchants) {
  return merchants.filter((m) => m.status === "active").length;
}

export function getHighRiskCount(merchants) {
  return merchants.filter((m) => m.riskLevel === "high").length;
}

// fake "success rate" derived from chargeback ratio
export function getAverageSuccessRate(merchants) {
  if (!merchants.length) return 0;
  const avgChargeback =
    merchants.reduce((sum, m) => sum + m.chargebackRatio, 0) /
    merchants.length;
  const successRate = 100 - avgChargeback; // naive
  return Math.max(0, Math.min(100, successRate));
}

// group volume by risk level for chart
export function getVolumeByRiskLevel(merchants) {
  const buckets = { low: 0, medium: 0, high: 0 };
  merchants.forEach((m) => {
    buckets[m.riskLevel] = (buckets[m.riskLevel] || 0) + m.monthlyVolume;
  });
  return buckets;
}
