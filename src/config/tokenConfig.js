/**
 * Token configuration for Final Trade
 * This makes it easy to swap test tokens for production ones
 */
const TOKEN_CONFIG = {
  // First species token config
  species1: {
    id: 'VELO',
    name: 'Velodrome',
    symbol: '$VELO',
    emoji: '🦋',
    chain: 'optimism',
    pairAddress: '0x1a7c9b1097d0a5e2d0aef182aef192ca89cf1af6',
    colorPrimary: '#4caf50',
    colorSecondary: '#a5d6a7'
  },
  // Second species token config
  species2: {
    id: 'OP',
    name: 'Optimism',
    symbol: '$OP',
    emoji: '🦥',
    chain: 'optimism',
    pairAddress: '0x68f5c0a2de713a54991e01858fd27a3832401849',
    colorPrimary: '#9c27b0',
    colorSecondary: '#ce93d8'
  }
};

export default TOKEN_CONFIG;

