/**
 * Service for interacting with DexScreener API
 */
const DexScreenerService = {
    // Fetch token pair data from DexScreener API
    fetchPairData: async (chain, pairAddress) => {
      try {
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/pairs/${chain}/${pairAddress}`
        );
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching pair data:", error);
        return null;
      }
    },
  
    // Calculate volatility (simplified for prototype)
    calculateVolatility: (priceHistory) => {
      // For demo, we'll use a simple approach
      // In a real implementation, this would use standard deviation
      const volatility = Math.random() * 0.5 + 0.3;
      return volatility;
    }
  };
  
  export default DexScreenerService;
  