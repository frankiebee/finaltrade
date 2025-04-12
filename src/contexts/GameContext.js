import React, { createContext, useState, useEffect, useCallback } from 'react';
import DexScreenerService from '../services/DexScreenerService';
import GameMechanicsService from '../services/GameMechanicsService';
import TOKEN_CONFIG from '../config/tokenConfig';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  // State for token market data
  const [tokenData, setTokenData] = useState({
    [TOKEN_CONFIG.species1.id]: {
      price: 0.15,
      priceChange: 2.5,
      volume: 125000,
      marketCap: 750000,
      volatility: 0.35,
    },
    [TOKEN_CONFIG.species2.id]: {
      price: 2.75,
      priceChange: -1.2,
      volume: 350000,
      marketCap: 450000,
      volatility: 0.25,
    }
  });
  
  // Health scores
  const [healthScores, setHealthScores] = useState({
    [TOKEN_CONFIG.species1.id]: 65,
    [TOKEN_CONFIG.species2.id]: 45
  });
  
  // Current moves
  const [currentMoves, setCurrentMoves] = useState({
    [TOKEN_CONFIG.species1.id]: null,
    [TOKEN_CONFIG.species2.id]: null
  });
  
  // Battle log
  const [battleLogs, setBattleLogs] = useState([
    { message: `Battle started! ${TOKEN_CONFIG.species1.symbol} vs ${TOKEN_CONFIG.species2.symbol}`, timestamp: new Date().toLocaleTimeString(), type: 'event' }
  ]);
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Auto update toggle
  const [autoUpdate, setAutoUpdate] = useState(false);
  
  // Use mock data for testing
  const [useMockData, setUseMockData] = useState(true);
  
  // Fetch token data from API
  const fetchTokenData = useCallback(async () => {
    setLoading(true);
    
    try {
      // If using mock data, generate random values
      if (useMockData) {
        setTokenData(prev => ({
          [TOKEN_CONFIG.species1.id]: {
            price: prev[TOKEN_CONFIG.species1.id].price * (1 + (Math.random() * 0.1 - 0.05)),
            priceChange: Math.min(30, Math.max(-30, prev[TOKEN_CONFIG.species1.id].priceChange + (Math.random() * 6 - 3))),
            volume: prev[TOKEN_CONFIG.species1.id].volume * (1 + (Math.random() * 0.2 - 0.1)),
            marketCap: prev[TOKEN_CONFIG.species1.id].marketCap * (1 + (Math.random() * 0.1 - 0.05)),
            volatility: Math.min(1, Math.max(0, Math.random() * 0.5 + 0.3))
          },
          [TOKEN_CONFIG.species2.id]: {
            price: prev[TOKEN_CONFIG.species2.id].price * (1 + (Math.random() * 0.05 - 0.025)),
            priceChange: Math.min(30, Math.max(-30, prev[TOKEN_CONFIG.species2.id].priceChange + (Math.random() * 4 - 2))),
            volume: prev[TOKEN_CONFIG.species2.id].volume * (1 + (Math.random() * 0.15 - 0.075)),
            marketCap: prev[TOKEN_CONFIG.species2.id].marketCap * (1 + (Math.random() * 0.08 - 0.04)),
            volatility: Math.min(1, Math.max(0, Math.random() * 0.4 + 0.2))
          }
        }));
      } else {
        // Fetch real data from DexScreener
        const species1Response = await DexScreenerService.fetchPairData(
          TOKEN_CONFIG.species1.chain, 
          TOKEN_CONFIG.species1.pairAddress
        );
        
        const species2Response = await DexScreenerService.fetchPairData(
          TOKEN_CONFIG.species2.chain, 
          TOKEN_CONFIG.species2.pairAddress
        );
        
        if (species1Response?.pairs?.[0] && species2Response?.pairs?.[0]) {
          // Process species 1 data
          const species1Pair = species1Response.pairs[0];
          const species1Volatility = DexScreenerService.calculateVolatility(TOKEN_CONFIG.species1.id);
          
          // Process species 2 data
          const species2Pair = species2Response.pairs[0];
          const species2Volatility = DexScreenerService.calculateVolatility(TOKEN_CONFIG.species2.id);
          
          // Update token data state
          setTokenData({
            [TOKEN_CONFIG.species1.id]: {
              price: parseFloat(species1Pair.priceUsd),
              priceChange: parseFloat(species1Pair.priceChange.h1),
              volume: parseFloat(species1Pair.volume.h24),
              marketCap: parseFloat(species1Pair.fdv || species1Pair.liquidity.usd * 2),
              volatility: species1Volatility
            },
            [TOKEN_CONFIG.species2.id]: {
              price: parseFloat(species2Pair.priceUsd),
              priceChange: parseFloat(species2Pair.priceChange.h1),
              volume: parseFloat(species2Pair.volume.h24),
              marketCap: parseFloat(species2Pair.fdv || species2Pair.liquidity.usd * 2),
              volatility: species2Volatility
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching token data:", error);
    } finally {
      setLoading(false);
    }
  }, [useMockData]);
  
  // Process market data into game state
  const processMarketData = useCallback(() => {
    // Calculate health scores
    const species1Health = GameMechanicsService.calculateHealthScore(tokenData[TOKEN_CONFIG.species1.id]);
    const species2Health = GameMechanicsService.calculateHealthScore(tokenData[TOKEN_CONFIG.species2.id]);
    
    setHealthScores({
      [TOKEN_CONFIG.species1.id]: species1Health,
      [TOKEN_CONFIG.species2.id]: species2Health
    });
    
    // Determine moves based on metrics
    const species1Move = GameMechanicsService.determineMoveFromMetrics(tokenData[TOKEN_CONFIG.species1.id]);
    const species2Move = GameMechanicsService.determineMoveFromMetrics(tokenData[TOKEN_CONFIG.species2.id]);
    
    // Only update moves if they've changed
    if (species1Move.moveId && (!currentMoves[TOKEN_CONFIG.species1.id] || 
        species1Move.moveId !== currentMoves[TOKEN_CONFIG.species1.id]?.moveId)) {
      
      setCurrentMoves(prev => ({
        ...prev,
        [TOKEN_CONFIG.species1.id]: species1Move
      }));
      
      // Add to battle log
      setBattleLogs(prev => [
        { 
          message: `${TOKEN_CONFIG.species1.symbol} performs ${species1Move.moveId}: ${species1Move.name}!`, 
          timestamp: new Date().toLocaleTimeString(), 
          type: 'attack' 
        },
        ...prev
      ]);
    }
    
    if (species2Move.moveId && (!currentMoves[TOKEN_CONFIG.species2.id] || 
        species2Move.moveId !== currentMoves[TOKEN_CONFIG.species2.id]?.moveId)) {
      
      setCurrentMoves(prev => ({
        ...prev,
        [TOKEN_CONFIG.species2.id]: species2Move
      }));
      
      // Add to battle log
      setBattleLogs(prev => [
        { 
          message: `${TOKEN_CONFIG.species2.symbol} performs ${species2Move.moveId}: ${species2Move.name}!`, 
          timestamp: new Date().toLocaleTimeString(), 
          type: 'attack' 
        },
        ...prev
      ]);
    }
    
    // Check for victory conditions
    if (tokenData[TOKEN_CONFIG.species1.id].marketCap >= 1000000 && 
        !battleLogs.some(log => log.message.includes(`${TOKEN_CONFIG.species1.symbol} WINS!`))) {
      
      setBattleLogs(prev => [
        { 
          message: `${TOKEN_CONFIG.species1.symbol} WINS! Market cap reached $1,000,000!`, 
          timestamp: new Date().toLocaleTimeString(), 
          type: 'event' 
        },
        ...prev
      ]);
    }
    
    if (tokenData[TOKEN_CONFIG.species2.id].marketCap >= 1000000 && 
        !battleLogs.some(log => log.message.includes(`${TOKEN_CONFIG.species2.symbol} WINS!`))) {
      
      setBattleLogs(prev => [
        { 
          message: `${TOKEN_CONFIG.species2.symbol} WINS! Market cap reached $1,000,000!`, 
          timestamp: new Date().toLocaleTimeString(), 
          type: 'event' 
        },
        ...prev
      ]);
    }
  }, [tokenData, currentMoves, battleLogs]);
  
  // Handle market actions (buy/sell)
  const handleMarketAction = useCallback((action, tokenId, amount) => {
    // Update token data based on action
    setTokenData(prev => {
      const updatedData = { ...prev };
      
      if (action === 'buy') {
        // Buying increases price, volume, and potentially market cap
        updatedData[tokenId] = {
          ...updatedData[tokenId],
          price: updatedData[tokenId].price * (1 + (amount / 10000)),
          priceChange: updatedData[tokenId].priceChange + (amount / 100),
          volume: updatedData[tokenId].volume + amount,
          marketCap: updatedData[tokenId].marketCap + (amount * 2)
        };
      } else {
        // Selling decreases price, increases volume and volatility
        updatedData[tokenId] = {
          ...updatedData[tokenId],
          price: updatedData[tokenId].price * (1 - (amount / 10000)),
          priceChange: updatedData[tokenId].priceChange - (amount / 100),
          volume: updatedData[tokenId].volume + amount,
          marketCap: Math.max(0, updatedData[tokenId].marketCap - (amount * 2)),
          volatility: Math.min(1, updatedData[tokenId].volatility + (amount / 10000))
        };
      }
      
      return updatedData;
    });
    
    // Add to battle log
    const tokenSymbol = tokenId === TOKEN_CONFIG.species1.id ? 
      TOKEN_CONFIG.species1.symbol : TOKEN_CONFIG.species2.symbol;
      
    setBattleLogs(prev => [
      { 
        message: `${action.toUpperCase()} $${amount} of ${tokenSymbol}`, 
        timestamp: new Date().toLocaleTimeString(), 
        type: action === 'buy' ? 'buff' : 'attack'
      },
      ...prev
    ]);
  }, []);
  
  // Effect to update data periodically when auto-update is enabled
  useEffect(() => {
    let interval;
    
    if (autoUpdate) {
      interval = setInterval(() => {
        fetchTokenData();
      }, 10000); // Update every 10 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoUpdate, fetchTokenData]);
  
  // Process market data whenever token data changes
  useEffect(() => {
    processMarketData();
  }, [tokenData, processMarketData]);
  
  return (
    <GameContext.Provider value={{
      tokenConfig: TOKEN_CONFIG,
      tokenData,
      healthScores,
      currentMoves,
      battleLogs,
      loading,
      autoUpdate,
      setAutoUpdate,
      useMockData,
      setUseMockData,
      fetchTokenData,
      handleMarketAction
    }}>
      {children}
    </GameContext.Provider>
  );
};