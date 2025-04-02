/*



TODO: MAKE THIS WORK FRANKIE
https://www.notion.so/caregiver/Proto-Game-Dynamics-1c18eba761f080aeb097dc5208df69ba?pvs=4


*/


import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create context
export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Simulate wallet connection
  const connectWallet = async () => {
    try {
      const mmAccount = await connectMetaMaskAndSwitchToOptimismSepolia()
      // This is a mock function for the prototype
      setAccount(mmAccount)
      setIsConnected(true);
      return true;
    } catch (error) {
      console.error("Connection error:", error);
      return false;
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    setAccount('');
    setIsConnected(false);
  };

  // For simulation mode
  const simulateConnection = () => {
    setAccount('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    setIsConnected(true);
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
        simulateConnection, 
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export async function connectMetaMaskAndSwitchToOptimismSepolia() {
  const optimismSepoliaChainId = '0xaa37dc'; // 11155420 in hex

  const optimismSepoliaParams = {
    chainId: optimismSepoliaChainId,
    chainName: 'Optimism Sepolia Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://sepolia.optimism.io'],
    blockExplorerUrls: ['https://sepolia-optimism.etherscan.io']
  };

  try {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const account = accounts[0];
    console.log('Connected account:', account);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: optimismSepoliaChainId }]
      });
      console.log('Switched to Optimism Sepolia Testnet');
    } catch (switchError) {
      if (switchError.code === 4902) {
        // Chain not added, try to add it
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [optimismSepoliaParams]
        });
        console.log('Added and switched to Optimism Sepolia Testnet');
      } else {
        throw switchError;
      }
    }

    return account;
  } catch (error) {
    console.error('Error connecting to MetaMask or switching network:', error);
    throw error;
  }
}

export default Web3Context;
