/**
 * Service for handling game mechanics and translating market data to game actions
 */
const GameMechanicsService = {
    // Determine move based on market metrics
    determineMoveFromMetrics: (metrics) => {
      // Punches (price change)
      if (metrics.priceChange >= 20) return { moveId: 'P5', name: 'Devastating Punch', power: 5 };
      if (metrics.priceChange >= 10) return { moveId: 'P4', name: 'Strong Punch', power: 4 };
      if (metrics.priceChange >= 7) return { moveId: 'P3', name: 'Solid Hit', power: 3 };
      if (metrics.priceChange >= 4) return { moveId: 'P2', name: 'Medium Punch', power: 2 };
      if (metrics.priceChange >= 1) return { moveId: 'P1', name: 'Quick Jab', power: 1 };
      
      // Kicks (volume)
      if (metrics.volume >= 100000) return { moveId: 'K5', name: 'Power Kick', power: 5 };
      if (metrics.volume >= 50000) return { moveId: 'K4', name: 'Jump Kick', power: 4 };
      if (metrics.volume >= 25000) return { moveId: 'K3', name: 'Face Kick', power: 3 };
      if (metrics.volume >= 10000) return { moveId: 'K2', name: 'Mid Kick', power: 2 };
      
      // Special moves
      if (metrics.volatility >= 0.8 && metrics.marketCap >= 500000 && metrics.volume >= 25000) {
        return { moveId: 'C3', name: 'KO MOVE!', power: 10 };
      }
      if (metrics.volatility >= 0.65) {
        return { moveId: 'C2', name: 'Combo Attack', power: 6 };
      }
      
      // Defensive or miss moves for negative price changes
      if (metrics.priceChange <= -20) return { moveId: 'D1', name: 'Counter Move', power: 2 };
      if (metrics.priceChange < 0) return { moveId: 'M', name: 'Miss', power: 0 };
      
      return { moveId: null, name: 'No Move', power: 0 };
    },
    
    // Calculate health score
    calculateHealthScore: (metrics) => {
      const marketCapScore = Math.min(metrics.marketCap / 1000000, 1);
      const volumeScore = Math.min(metrics.volume / 100000, 1);
      const priceDeltaScore = (metrics.priceChange + 30) / 60; // Normalize from -30% to +30%
      const volatilityScore = metrics.volatility;
      
      const healthScore = 
        (0.3 * marketCapScore) +
        (0.25 * volumeScore) +
        (0.2 * priceDeltaScore) +
        (0.1 * volatilityScore);
      
      return Math.max(0, Math.min(100, healthScore * 100));
    }
  };
  
  export default GameMechanicsService;
  