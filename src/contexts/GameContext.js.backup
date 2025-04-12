import React, { createContext, useState, useCallback } from 'react';

// Create context
export const GameContext = createContext();

// Initial market stats for both tokens
const initialMonarchStats = {
  price: 0.003921, // In USD
  priceHistory: Array(24).fill(0).map((_, i) => ({ 
    time: new Date(Date.now() - (23-i) * 3600000).toISOString(), 
    price: 0.003921 * (1 + Math.sin(i/3) * 0.1) 
  })),
  priceChange24h: 12.4, // Percentage
  marketCap: 350211, // In USD
  volume24h: 54892, // In USD
  holders: 1287,
  totalSupply: 100000000,
  circulatingSupply: 25000000,
};

const initialSlothStats = {
  price: 0.003785, // In USD
  priceHistory: Array(24).fill(0).map((_, i) => ({ 
    time: new Date(Date.now() - (23-i) * 3600000).toISOString(), 
    price: 0.003785 * (1 + Math.cos(i/3) * 0.1) 
  })),
  priceChange24h: -3.2, // Percentage
  marketCap: 290845, // In USD
  volume24h: 62342, // In USD
  holders: 946,
  totalSupply: 100000000,
  circulatingSupply: 25000000,
};

// Initial battle events
const initialBattleEvents = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    type: 'attack',
    species: 'Monarch',
    power: 1245,
    description: 'Large buy detected for $3TOED ($1,245) - Attack power increased!'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    type: 'attack',
    species: 'Sloth',
    power: 820,
    description: '$MNRCH performed Jump Attack due to 24h volume spike!'
  }
];

export const GameProvider = ({ children }) => {
  // Game state
  const [monarchStats, setMonarchStats] = useState(initialMonarchStats);
  const [slothStats, setSlothStats] = useState(initialSlothStats);
  const [battleEvents, setBattleEvents] = useState(initialBattleEvents);
  
  // Add a new battle event
  const addBattleEvent = useCallback((event) => {
    const newEvent = {
      id: Date.now(), // Use timestamp as unique ID
      timestamp: event.timestamp || new Date().toISOString(),
      type: event.type,
      species: event.species,
      power: event.power,
      description: event.description
    };
    
    setBattleEvents(prevEvents => [newEvent, ...prevEvents]);
  }, []);
  
  // Update market stats based on new market actions
  const updateMarketStats = useCallback((event) => {
    // Simple implementation for the prototype
    if (!event) {
      return;
    }
    
    // Process specific market action
    const { action, token, amount } = event;
    const isMonarch = token === 'Monarch' || token === '$3TOED';
    
    if (isMonarch) {
      setMonarchStats(prev => ({
        ...prev,
        price: prev.price * (1 + (action === 'buy' ? 0.01 : -0.01)),
        marketCap: prev.marketCap * (1 + (action === 'buy' ? 0.01 : -0.01)),
      }));
    } else {
      setSlothStats(prev => ({
        ...prev,
        price: prev.price * (1 + (action === 'buy' ? 0.01 : -0.01)),
        marketCap: prev.marketCap * (1 + (action === 'buy' ? 0.01 : -0.01)),
      }));
    }
  }, []);
  
  return (
    <GameContext.Provider
      value={{
        monarchStats,
        slothStats,
        battleEvents,
        addBattleEvent,
        updateMarketStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContext;
