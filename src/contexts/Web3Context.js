/*



TODO: MAKE THIS WORK FRANKIE
https://www.notion.so/caregiver/Proto-Game-Dynamics-1c18eba761f080aeb097dc5208df69ba?pvs=4


*/


import React, { createContext, useState, useEffect, useCallback } from 'react';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

// Create context
export const Web3Context = createContext();

// Provider options for Web3Modal
const providerOptions = {
  // Add wallet connectors here when needed
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [web3Modal, setWeb3Modal] = useState(null);

  // Initialize Web3Modal
  useEffect(() => {
    const modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
      theme: {
        background: "#0a0a0f",
        main: "#ffffff",
        secondary: "#858585",
        border: "#00e5ff",
        hover: "rgba(0, 229, 255, 0.1)"
      }
    });

    setWeb3Modal(modal);

    // Auto connect if cached provider exists
    if (modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet();
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  }, [account]);

  // Handle chain changes
  const handleChainChanged = useCallback((chainId) => {
    // Convert hex chainId to decimal
    const decimalChainId = parseInt(chainId, 16);
    setChainId(decimalChainId);

    // Refresh the page on chain change as recommended by MetaMask
    window.location.reload();
  }, []);

  // Set up event listeners when provider changes
  useEffect(() => {
    if (web3 && web3.currentProvider && web3.currentProvider.on) {
      const provider = web3.currentProvider;

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", disconnectWallet);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", disconnectWallet);
        }
      };
    }
  }, [web3, handleAccountsChanged, handleChainChanged]);

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!web3Modal) return;

      const provider = await web3Modal.connect();
      const web3Instance = new Web3(provider);

      const accounts = await web3Instance.eth.getAccounts();
      const chainId = await web3Instance.eth.getChainId();

      setWeb3(web3Instance);

      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      }

      setChainId(chainId);

      return true;
    } catch (error) {
      console.error("Connection error:", error);
      return false;
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    if (web3 && web3.currentProvider) {
      const provider = web3.currentProvider;

      if (provider.close) {
        await provider.close();
      }
    }

    if (web3Modal) {
      await web3Modal.clearCachedProvider();
    }

    setAccount('');
    setChainId(null);
    setIsConnected(false);
  };

  // Switch to specific network
  const switchNetwork = async (targetChainId) => {
    if (!web3 || !window.ethereum) return false;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });

      return true;
    } catch (error) {
      console.error("Error switching network:", error);
      return false;
    }
  };

  // For simulation mode only - this creates a mock web3 connection
  const simulateConnection = () => {
    setAccount('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
    setChainId(421613); // Arbitrum Goerli testnet
    setIsConnected(true);
  };

  return (
    <Web3Context.Provider
      value={{
        web3,
        account,
        chainId,
        isConnected,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        simulateConnection, // Remove in production
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
// Custom hook to use the Web3 context
export const useWeb3Context = () => {
  return React.useContext(Web3Context);
};

export default useWeb3Context;