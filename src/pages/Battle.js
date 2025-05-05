// src/pages/Battle.js
import finalTradeLogo from '../images/final_trade_logo.png';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Slide,
  Fade,
  Zoom,
  useMediaQuery
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { GameContext } from '../contexts/GameContext';
import { Web3Context } from '../contexts/Web3Context';

// Import icons
import InfoIcon from '@mui/icons-material/Info';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloseIcon from '@mui/icons-material/Close';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// ===============================
// STYLED COMPONENTS
// ===============================

// Main battle container with cyber background and noise texture
const BattleContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/neon_hum.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'bottom center',
  '&::before': { // Dark overlay for depth
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(7, 11, 52, 0.7), rgba(7, 11, 52, 0.3))',
    zIndex: 1,
    pointerEvents: 'none',
  },
  '&::after': { // Noise texture overlay
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    opacity: 0.06,
    zIndex: 2,
    pointerEvents: 'none',
    mixBlendMode: 'overlay',
  },
  padding: 0,
}));

// Cyber-styled header with notched corners and glow
const CyberHeader = styled(Box)(({ theme, color = '#FF3EC9', active = true }) => ({
  position: 'relative',
  padding: '8px 20px',
  color: '#fff',
  fontFamily: "'Anton', sans-serif",
  letterSpacing: '0.07em',
  textTransform: 'capitalize',
  overflow: 'visible',
  zIndex: 10,
  '&::before': { // Glowing border with angled design
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(7, 11, 52, 0.5)',
    border: `2px solid ${color}`,
    boxShadow: active ? `0 0 15px ${color}, 0 0 8px ${color}` : 'none',
    borderRadius: '8px',
    zIndex: -1,
  },
}));

// Neon text styling with stroke and multiple glow layers
const NeonText = styled(Typography)(({ theme, color = '#00FFF7', glowIntensity = 1 }) => ({
  position: 'relative',
  color: '#fff',
  fontFamily: "'Anton', sans-serif",
  textShadow: `
    0 0 5px ${color}, 
    0 0 ${10 * glowIntensity}px ${color}, 
    0 0 ${20 * glowIntensity}px ${color}`,
  letterSpacing: '0.07em',
  fontWeight: 700,
  textTransform: 'capitalize',
  zIndex: 10,
  // Text stroke for better legibility
  WebkitTextStroke: `1px ${color}`,
  textStroke: `1px ${color}`,
}));

// Cyber styled panel with angular cuts and increased glow
const CyberPanel = styled(Box)(({ 
  theme, 
  color = '#00FFF7', 
  active = false, 
  glow = true,
  clipShape = 'default' // Options: default, rounded, angled, wing
}) => {
  // Different clip paths for various panel styles
  let clipPathValue;
  let borderRadiusValue = '12px';
  
  switch(clipShape) {
    case 'rounded':
      clipPathValue = 'none';
      borderRadiusValue = '20px';
      break;
    case 'angled':
      clipPathValue = 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)';
      borderRadiusValue = '0px';
      break;
    case 'wing':
      clipPathValue = 'polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%, 5% 50%)';
      borderRadiusValue = '0px';
      break;
    default:
      clipPathValue = 'none';
      borderRadiusValue = '16px';
  }
  
  return {
    position: 'relative',
    padding: theme.spacing(2),
    borderRadius: borderRadiusValue,
    background: 'rgba(7, 11, 52, 0.6)',
    backgroundImage: 'linear-gradient(to bottom, rgba(7, 11, 52, 0.8), rgba(7, 11, 52, 0.4))',
    backdropFilter: 'blur(4px)',
    overflow: 'hidden',
    zIndex: 10,
    transition: 'all 0.3s ease',
    clipPath: clipPathValue,
    border: `2px solid ${color}`,
    boxShadow: glow ? `0 0 15px ${color}, 0 0 8px ${color}` : 'none',
    '&:hover': {
      boxShadow: glow ? `0 0 20px ${color}, 0 0 10px ${color}` : 'none',
    }
  };
});

// Character container with improved positioning
const CharacterContainer = styled(Box)(({ theme, position = 'left', active = false }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  zIndex: 10,
  animation: active ? `${position === 'left' ? 'attackLeft' : 'attackRight'} 0.5s ease-in-out` : 'none',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    '& img': {
      maxHeight: '45vh', // Scale down characters on mobile
      width: 'auto',
    }
  },
}));

// Rainbow gradient health bar inspired by fighting games
const FightingGameHealthBar = styled(Box)(({ 
  theme, 
  value = 50, 
  maxValue = 100,
  position = 'left',
  color1 = '#00FFF7', 
  color2 = '#FF3EC9' 
}) => ({
  height: '20px',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.8)',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  border: '2px solid #ffde00',
  boxShadow: '0 0 10px rgba(255, 222, 0, 0.5)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    [position === 'left' ? 'left' : 'right']: 0,
    height: '100%',
    width: `${value}%`,
    background: 'linear-gradient(90deg, #ff1744, #ff9100, #ffde00, #00e676, #00b0ff, #2979ff, #651fff)',
    backgroundSize: '700% 100%',
    animation: 'moveGradient 10s linear infinite',
    transition: 'width 0.3s ease-out',
  },
  '& .health-nodes': {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '2px',
    right: '2px',
    transform: 'translateY(-50%)',
    justifyContent: 'space-between',
    zIndex: 2,
    pointerEvents: 'none',
  },
  '& .node': {
    width: '2px',
    height: '10px',
    background: 'rgba(0, 0, 0, 0.6)',
  }
}));

// Tab button that hugs the side of the screen and connects to the panel
const SideTab = styled(Button)(({ theme, color = '#00FFF7', side = 'left', active = false }) => ({
  position: 'fixed',
  [side]: active ? '300px' : 0, // Move with panel when active
  top: '35%',
  transform: 'translateY(-50%)',
  height: '120px',
  width: '40px',
  minWidth: '40px',
  padding: 0,
  borderRadius: side === 'left' ? '0 20px 20px 0' : '20px 0 0 20px',
  background: active ? color : 'rgba(0, 0, 0, 0.6)',
  border: `2px solid ${color}`,
  borderLeft: side === 'left' ? 'none' : `2px solid ${color}`,
  borderRight: side === 'right' ? 'none' : `2px solid ${color}`,
  color: active ? '#000' : color,
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 600,
  letterSpacing: '0.07em',
  textTransform: 'capitalize', // Title case instead of all caps
  writingMode: 'vertical-rl',
  textOrientation: side === 'left' ? 'mixed' : 'mixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
  boxShadow: active ? `0 0 15px ${color}, 0 0 8px ${color}` : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: active ? color : `rgba(${color.replace(/[^\d,]/g, '')}, 0.3)`,
    boxShadow: `0 0 15px ${color}, 0 0 8px ${color}`,
  },
  [theme.breakpoints.down('sm')]: {
    height: '100px',
    width: '34px',
  }
}));

// Bottom tab button that connects to the panel
const BottomTab = styled(Button)(({ theme, color = '#00FFF7', position = 'left', active = false }) => ({
  position: 'fixed',
  bottom: active ? '45%' : 0,
  // Modify these lines:
  left: position === 'left' ? '15%' : position === 'right' ? '85%' : '50%', // Changed from 25%/75% to 15%/85%
  transform: 'translateX(-50%)',
  height: '40px',
  width: '160px',
  borderRadius: '20px 20px 0 0',
  background: active ? color : 'rgba(0, 0, 0, 0.6)',
  border: `2px solid ${color}`,
  borderBottom: 'none',
  color: active ? '#000' : color,
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 600,
  letterSpacing: '0.05em',
  textTransform: 'capitalize',
  zIndex: 100,
  boxShadow: active ? `0 0 15px ${color}, 0 0 8px ${color}` : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: active ? color : `rgba(${color.replace(/[^\d,]/g, '')}, 0.3)`,
    boxShadow: `0 0 15px ${color}, 0 0 8px ${color}`,
  },
  [theme.breakpoints.down('sm')]: {
    width: '130px',
    fontSize: '0.75rem',
  }
}));

// Cyber button with slimmer design and controlled height
const CyberButton = styled(Button)(({ theme, color = '#00FFF7', active = false }) => ({
  position: 'relative',
  borderRadius: '20px',
  background: active ? color : 'rgba(0, 0, 0, 0.6)',
  border: `1px solid ${color}`,
  color: active ? '#000' : color,
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 500,
  letterSpacing: '0.03em',
  textTransform: 'capitalize',
  padding: '8px 16px', // Reduced vertical padding
  height: '32px', // Explicitly set height
  minHeight: '32px', // Set minimum height
  lineHeight: '1', // Tighter line height
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: active ? `0 0 10px ${color}, 0 0 5px ${color}` : 'none',
  '&:hover': {
    background: active ? color : `rgba(${color.replace(/[^\d,]/g, '')}, 0.3)`,
    boxShadow: `0 0 12px ${color}, 0 0 6px ${color}`,
  },
  '&:disabled': {
    border: `1px solid rgba(${color.replace(/[^\d,]/g, '')}, 0.3)`,
    color: `rgba(${color.replace(/[^\d,]/g, '')}, 0.3)`,
    background: 'rgba(0, 0, 0, 0.3)',
    boxShadow: 'none',
  }
}));

// Progress bar for market cap with winged design
// Progress bar for market cap with winged design
const MarketCapProgressBar = styled(Box)(({ 
  theme, 
  value = 0, 
  maxValue = 100, 
  color1 = '#00FFF7', 
  color2 = '#FF3EC9',
  height = 20, // Increased from 14 to make it thicker
  direction = 'left' // left or right for wing direction
}) => ({
  height: `${height}px`,
  width: '80%', // Shorter width (was 100%)
  background: 'rgba(0, 0, 0, 0.6)',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '20px',
  border: '2px solid #ffde00', // Gold border like fighting game UI
  boxShadow: '0 0 10px rgba(255, 222, 0, 0.5)',
  '&::before': { // Progress fill
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${(value / maxValue) * 100}%`,
    background: 'linear-gradient(90deg, #ff1744, #ff9100, #ffde00, #00e676, #00b0ff, #2979ff, #651fff)',
    backgroundSize: '700% 100%',
    animation: 'moveGradient 10s linear infinite',
    transition: 'width 0.3s ease-out',
  }
}));

// Stats panel for slide-out with improved styling - now transparent
const StatsPanel = styled(Box)(({ theme, position = 'left', color = '#00FFF7' }) => ({
  position: 'fixed',
  top: '20%',
  [position]: 0,
  width: '300px',
  height: '65%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  zIndex: 100,
  padding: '15px',
  // Remove these properties:
  // background: 'rgba(7, 11, 52, 0.6)',
  // backgroundImage: 'linear-gradient(to bottom, rgba(7, 11, 52, 0.8), rgba(7, 11, 52, 0.2))',
  // backdropFilter: 'blur(8px)',
  // borderTop: `2px solid ${color}`,
  // borderBottom: `2px solid ${color}`,
  // borderRight: position === 'left' ? `2px solid ${color}` : 'none',
  // borderLeft: position === 'right' ? `2px solid ${color}` : 'none',
  // boxShadow: `0 0 20px ${color}, 0 0 10px ${color}`,
  // borderTopRightRadius: position === 'left' ? '20px' : 0,
  // borderBottomRightRadius: position === 'left' ? '20px' : 0,
  // borderTopLeftRadius: position === 'right' ? '20px' : 0,
  // borderBottomLeftRadius: position === 'right' ? '20px' : 0,
  background: 'transparent', // Add this instead to make it transparent
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    width: '250px',
  }
}));

// Stat item with enhanced styling
const StatItem = styled(Box)(({ 
  theme, 
  color = '#00FFF7', 
  panelType = 'default' // Options: default, buff, volatility, alert
}) => {
  // Different styling for different panel types
  let styles = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: panelType === 'buff' ? 'column' : 'row',
    alignItems: panelType === 'buff' ? 'flex-start' : 'center',
    padding: theme.spacing(1.5),
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.4)',
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))',
    backdropFilter: 'blur(4px)',
    border: `2px solid ${color}`,
    boxShadow: `0 0 15px ${color}, 0 0 8px ${color}`,
    marginBottom: '10px',
    zIndex: 10,
    borderRadius: '16px',
  };
  
  // Apply different styles based on the panel type
  switch(panelType) {
    case 'buff':
      styles.borderRadius = '20px';
      break;
    case 'volatility':
      styles.borderRadius = '16px';
      break;
    case 'alert':
      styles.borderRadius = '20px';
      styles.background = `linear-gradient(135deg, rgba(0,0,0,0.6), rgba(${color.replace(/[^\d,]/g, '')}, 0.2))`;
      break;
    default:
      styles.borderRadius = '16px';
  }
  
  return styles;
});

// Buff icon with enhanced styling
const BuffIcon = styled(Box)(({ theme, active = false, color = '#FFD93D' }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: active ? color : 'rgba(0, 0, 0, 0.4)',
  border: `2px solid ${active ? color : 'rgba(255, 255, 255, 0.1)'}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? '#000' : 'rgba(255, 255, 255, 0.3)',
  boxShadow: active ? `0 0 15px ${color}, 0 0 8px ${color}` : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    border: `2px solid ${color}`,
    boxShadow: `0 0 10px ${color}, 0 0 5px ${color}`,
  }
}));

// Volatility meter with improved styling
const VolatilityMeter = styled(Box)(({ theme, value = 0.3, color = '#00FFF7' }) => ({
  position: 'relative',
  width: '100%',
  height: '36px',
  '& .value': {
    position: 'absolute',
    right: '5px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '24px',
    fontFamily: "'Manrope', monospace",
    fontWeight: 600,
    color: value > 0.65 ? '#A24DFF' : color,
    textShadow: value > 0.65 
      ? '0 0 8px #A24DFF, 0 0 15px #A24DFF' 
      : `0 0 8px ${color}, 0 0 15px ${color}`,
    transition: 'color 0.3s ease, text-shadow 0.3s ease',
  },
  '& .volatility-line': {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '3px',
    background: 'rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    borderRadius: '2px',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      background: value > 0.65 
        ? 'linear-gradient(90deg, transparent 0%, #A24DFF 10%, transparent 20%, #A24DFF 30%, transparent 40%, #A24DFF 50%, transparent 60%, #A24DFF 70%, transparent 80%, #A24DFF 90%, transparent 100%)' 
        : `linear-gradient(90deg, transparent 0%, ${color} 10%, transparent 20%, ${color} 30%, transparent 40%, ${color} 50%, transparent 60%, ${color} 70%, transparent 80%, ${color} 90%, transparent 100%)`,
      backgroundSize: '200% 100%',
      animation: 'moveVolatility 2s linear infinite',
    }
  }
}));

// Alert badge with improved styling
const AlertBadge = styled(Box)(({ theme, color = '#FF3EC9' }) => ({
  display: 'inline-block',
  padding: '5px 12px',
  background: 'rgba(0, 0, 0, 0.6)',
  borderRadius: '20px',
  border: `2px solid ${color}`,
  color: 'white',
  fontFamily: "'Manrope', sans-serif",
  fontWeight: 600,
  fontSize: '13px',
  boxShadow: `0 0 15px ${color}, 0 0 8px ${color}`,
  animation: 'fadeIn 0.3s ease-out',
  marginTop: '8px',
}));

// Price streak line with improved animation
const PriceStreakLine = styled(Box)(({ theme, color1 = '#00FFF7', color2 = '#FFD93D' }) => ({
  width: '100%',
  height: '3px',
  background: 'rgba(0, 0, 0, 0.4)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '2px',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${color1}, ${color2}, transparent)`,
    backgroundSize: '200% 100%',
    animation: 'moveStreak 8s linear infinite',
  }
}));

// VS badge with enhanced glow
const VsBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '120px',
  height: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 50,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(255, 145, 0, 0.4) 0%, rgba(255, 145, 0, 0) 70%)',
    filter: 'blur(10px)',
    animation: 'pulse 2s infinite',
  }
}));

// Bottom panel with improved styling
const BottomPanel = styled(Box)(({ theme, position = 'left', color = '#FF3EC9' }) => ({
  position: 'fixed',
  bottom: 0,
  left: position === 'left' ? '0' : '50%',
  width: '50%',
  height: '45%',
  background: 'rgba(7, 11, 52, 0.7)',
  backgroundImage: 'linear-gradient(to bottom, rgba(7, 11, 52, 0.9), rgba(7, 11, 52, 0.5))',
  backdropFilter: 'blur(8px)',
  borderTop: `2px solid ${color}`,
  borderRight: position === 'left' ? `2px solid ${color}` : 'none',
  borderLeft: position === 'right' ? `2px solid ${color}` : 'none',
  borderTopLeftRadius: position === 'left' ? '20px' : 0,
  borderTopRightRadius: position === 'right' ? '20px' : 0,
  boxShadow: `0 0 20px ${color}, 0 0 10px ${color}`,
  zIndex: 90,
  overflow: 'hidden',
  padding: '15px',
  transition: 'all 0.3s ease',
}));

// Battle log item with improved styling
const BattleLogItem = styled(Box)(({ theme, type = 'event' }) => ({
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1),
  borderRadius: '16px',
  background: type === 'event' 
    ? 'rgba(255, 145, 0, 0.1)' 
    : type === 'attack' 
      ? 'rgba(255, 62, 201, 0.1)' 
      : 'rgba(0, 230, 118, 0.1)',
  border: `2px solid ${
    type === 'event' 
      ? '#FF8C00' 
      : type === 'attack' 
        ? '#FF3EC9' 
        : '#00e676'
  }`,
  boxShadow: `0 0 10px ${
    type === 'event' 
      ? '#FF8C00' 
      : type === 'attack' 
        ? '#FF3EC9' 
        : '#00e676'
  }`,
  animation: 'fadeIn 0.3s ease-out',
}));

// Full-screen overlay for important events
const FullscreenOverlay = styled(Box)(({ theme, visible = false, color = '#FF3EC9' }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: `radial-gradient(circle, rgba(${color.replace(/[^\d,]/g, '')}, 0.7) 0%, rgba(0, 0, 0, 0.7) 100%)`,
  display: visible ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(5px)',
  animation: 'fadeIn 0.5s ease-out',
}));

// Market cap display with improved alignment
const MarketCapContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  zIndex: 20,
  padding: '0 5%',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 2%',
  }
}));

// Market cap bar container with improved layout
const MarketCapBarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '-10px',
  zIndex: 15,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '10px',
  }
}));

// ===============================
// MAIN COMPONENT
// ===============================

const Battle = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const { 
    tokenData, 
    healthScores, 
    currentMoves, 
    battleLogs, 
    handleMarketAction,
    autoUpdate,
    setAutoUpdate,
    fetchTokenData
  } = useContext(GameContext);
  const { isConnected, connectWallet } = useContext(Web3Context);
  
  // Refs for animation
  const slothRef = useRef(null);
  const monarchRef = useRef(null);
  
  // Local state
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [actionAmount, setActionAmount] = useState(100);
  const [isBuying, setIsBuying] = useState(true);
  const [showLeftStats, setShowLeftStats] = useState(false);
  const [showRightStats, setShowRightStats] = useState(false);
  const [showMarketPanel, setShowMarketPanel] = useState(false);
  const [showBattlePanel, setShowBattlePanel] = useState(false);
  const [showFightOverlay, setShowFightOverlay] = useState(false);
  const [showKoOverlay, setShowKoOverlay] = useState(false);
  const [attackAnimation, setAttackAnimation] = useState({
    left: false,
    right: false
  });

  // Get token config from context
  const { tokenConfig } = useContext(GameContext);
  const species1 = tokenConfig?.species1 || { id: 'monarch', symbol: '$VELO' };
  const species2 = tokenConfig?.species2 || { id: 'sloth', symbol: '$OP' };

  // Show "FIGHT!" on initial render
  useEffect(() => {
    setShowFightOverlay(true);
    const timer = setTimeout(() => {
      setShowFightOverlay(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Set selected species from navigation if available
  useEffect(() => {
    if (location.state && location.state.species) {
      setSelectedSpecies(location.state.species === 'monarch' ? species1.id : species2.id);
    }
  }, [location, species1, species2]);
  
  // Play attack animation when moves change
  useEffect(() => {
    if (currentMoves[species1.id] && currentMoves[species1.id] !== "") {
      setAttackAnimation(prev => ({ ...prev, right: true }));
      setTimeout(() => {
        setAttackAnimation(prev => ({ ...prev, right: false }));
      }, 500);
    }
    
    if (currentMoves[species2.id] && currentMoves[species2.id] !== "") {
      setAttackAnimation(prev => ({ ...prev, left: true }));
      setTimeout(() => {
        setAttackAnimation(prev => ({ ...prev, left: false }));
      }, 500);
    }
  }, [currentMoves, species1.id, species2.id]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
  };

  // Handle market action
  const executeAction = () => {
    if (!selectedSpecies) {
      // If no species selected, prompt user to select
      return;
    }
    
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    handleMarketAction(
      isBuying ? 'buy' : 'sell',
      selectedSpecies,
      actionAmount
    );
  };

  // Format volatility value
  const formatVolatility = (value) => {
    return value?.toFixed(2) || '0.00';
  };

  // Calculate buff states based on metrics
  const getBuffs = (speciesId) => {
    const data = tokenData[speciesId] || {};
    return {
      power: (data.priceChange || 0) >= 10, // Power buff active if price change >= 10%
      volume: (data.volume || 0) >= 25000, // Volume buff active if volume >= $25K
      volatility: (data.volatility || 0) >= 0.65, // Volatility buff active if volatility >= 0.65
    };
  };

  // Get alerts based on metrics
  const getAlerts = (speciesId) => {
    const data = tokenData[speciesId] || {};
    const alerts = [];
    
    if ((data.priceChange || 0) <= -15) {
      alerts.push({ message: "Species Vulnerable!", color: '#f44336' });
    }
    
    if ((data.volatility || 0) >= 0.75) {
      alerts.push({ message: "Wildcard Ready!", color: '#A24DFF' });
    }
    
    if (getComboValue(speciesId) >= 0.8) {
      alerts.push({ message: "Combo Ready!", color: '#FFD93D' });
    }
    
    if ((data.priceChange || 0) >= 20) {
      alerts.push({ message: "Price Surge!", color: '#00e676' });
    }
    
    return alerts;
  };
  
  // Get combo meter value based on metrics
  const getComboValue = (speciesId) => {
    const data = tokenData[speciesId] || {};
    // Complex logic for combo calculation could go here
    // For now, simple calculation based on multiple metrics
    const priceContribution = Math.min(Math.abs(data.priceChange || 0) / 20, 1);
    const volumeContribution = Math.min((data.volume || 0) / 50000, 1);
    const volatilityContribution = Math.min((data.volatility || 0) / 0.8, 1);
    
    return (priceContribution + volumeContribution + volatilityContribution) / 3;
  };

  // Get buffs and alerts for each species
  const monarch1Buffs = getBuffs(species1.id);
  const sloth1Buffs = getBuffs(species2.id);
  
  const monarchCombo = getComboValue(species1.id);
  const slothCombo = getComboValue(species2.id);
  
  const monarchAlerts = getAlerts(species1.id);
  const slothAlerts = getAlerts(species2.id);
  
  // Calculate progress percentage for market cap
  const getCapProgress = (marketCap) => {
    return Math.min((marketCap / 1000000) * 100, 100);
  };

  // Handle slider change for amount
  const handleAmountChange = (e) => {
    setActionAmount(parseInt(e.target.value, 10));
  };

  // Character size scaling based on viewport
  const getCharacterSize = () => {
    if (isMobile) return 300;
    return 540; // 450 * 1.2 (20% larger)
  };

  return (
    <BattleContainer>
      {/* Top Navigation */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 2, 
        position: 'relative',
        zIndex: 100
      }}>
        <Box component="img" 
  src={finalTradeLogo} 
  alt="Final Trade" 
  sx={{ height: 60 }}
/>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <CyberButton 
            color={autoUpdate ? "#00e676" : "#00FFF7"}
            active={autoUpdate}
            onClick={() => setAutoUpdate(!autoUpdate)}
            size="small"
          >
            {autoUpdate ? "Simulation On" : "Start Sim"}
          </CyberButton>
          
          <CyberButton 
            color="#00FFF7"
            onClick={fetchTokenData}
            size="small"
          >
            Refresh
          </CyberButton>
          
          <CyberButton 
            color="#FF3EC9"
            size="small"
          >
            Connect Wallet
          </CyberButton>
        </Box>
      </Box>
      
    {/* Market Cap Display */}
<MarketCapContainer>
  {/* Market Cap Header */}
  <CyberHeader color="#FF3EC9">
    <NeonText variant="h5" color="#FF3EC9">Market Cap</NeonText>
  </CyberHeader>
  
  {/* Market Cap Progress Bars */}
  <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingX: 4,
    gap: '4px', // Minimal gap between bars
    marginTop: 1,
    position: 'relative'
  }}>
    {/* Left Value - $OP */}
    <Typography 
      sx={{
        position: 'absolute',
        left: '12px',
        top: '-6px',
        color: '#00FFF7',
        textShadow: '0 0 5px #00FFF7',
        fontWeight: 'bold',
        fontFamily: "'Bungee', sans-serif",
        fontSize: '1.1rem',
      }}
    >
      {formatNumber(tokenData[species2.id]?.marketCap || 0)}
    </Typography>
    
    {/* Left Symbol */}
    <Typography 
      sx={{
        position: 'absolute',
        left: '12px',
        bottom: '10px',
        color: '#00FFF7',
        addingX: 4,
    gap: '4px',
        fontFamily: "'Bungee', sans-serif",
        fontSize: '2rem',
      }}
    >
      $OP
    </Typography>
    
    {/* Left Progress Bar */}
    <Box sx={{ 
      width: '45%', 
      height: '22px',
      background: 'rgba(0, 0, 0, 0.7)',
      border: '2px solid #ffde00', 
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(255, 222, 0, 0.5)',
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: `${getCapProgress(tokenData[species2.id]?.marketCap || 0)}%`,
        background: 'linear-gradient(90deg, #ff1744, #ff9100, #ffde00, #00e676, #00b0ff, #2979ff, #651fff)',
        backgroundSize: '700% 100%',
        animation: 'moveGradient 10s linear infinite',
        transition: 'width 0.3s ease-out',
        transform: 'scaleX(-1)' // This flips the left bar
      }}/>
      
      {/* Left Percentage */}
      <Typography sx={{
        position: 'absolute',
        right: '8px',
        top: '1px',
        color: '#aaa',
        fontFamily: "'Manrope', monospace",
        fontSize: '0.75rem',
        zIndex: 2
      }}>
        {getCapProgress(tokenData[species2.id]?.marketCap || 0).toFixed(1)}%
      </Typography>
    </Box>
    
    {/* Right Progress Bar */}
    <Box sx={{ 
      width: '45%', 
      height: '22px',
      background: 'rgba(0, 0, 0, 0.7)',
      border: '2px solid #ffde00', 
      borderRadius: '12px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 0 10px rgba(255, 222, 0, 0.5)',
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: `${getCapProgress(tokenData[species1.id]?.marketCap || 0)}%`,
        background: 'linear-gradient(90deg, #ff1744, #ff9100, #ffde00, #00e676, #00b0ff, #2979ff, #651fff)',
        backgroundSize: '700% 100%',
        animation: 'moveGradient 10s linear infinite',
        transition: 'width 0.3s ease-out',
      }}/>
      
      {/* Right Percentage */}
      <Typography sx={{
        position: 'absolute',
        left: '8px',
        top: '1px',
        color: '#aaa',
        fontFamily: "'Manrope', monospace",
        fontSize: '0.75rem',
        zIndex: 2
      }}>
        {getCapProgress(tokenData[species1.id]?.marketCap || 0).toFixed(1)}%
      </Typography>
    </Box>
    
    {/* Right Value - $VELO */}
    <Typography 
      sx={{
        position: 'absolute',
        right: '12px',
        top: '-6px',
        color: '#FF8C00',
        textShadow: '0 0 5px #FF8C00',
        fontWeight: 'bold',
        fontFamily: "'Bungee', sans-serif",
        fontSize: '1.1rem',
      }}
    >
      {formatNumber(tokenData[species1.id]?.marketCap || 0)}
    </Typography>
    
    {/* Right Symbol */}
    <Typography 
      sx={{
        position: 'absolute',
        right: '12px',
        bottom: '-6px',
        color: '#FF8C00',
        fontFamily: "'Bungee', sans-serif",
        fontSize: '0.9rem',
      }}
    >
      $VELO
    </Typography>
  </Box>
</MarketCapContainer>

      {/* Side tabs for stats */}
      <SideTab 
        color="#FF3EC9" 
        side="left" 
        active={showLeftStats}
        onClick={() => setShowLeftStats(!showLeftStats)}
      >
        Stats {showLeftStats ? '-' : '+'}
      </SideTab>
      
      <SideTab 
        color="#FF8C00" 
        side="right" 
        active={showRightStats}
        onClick={() => setShowRightStats(!showRightStats)}
      >
        Stats {showRightStats ? '-' : '+'}
      </SideTab>
      
      {/* Bottom tabs for market actions and battle log */}
      <BottomTab 
        color="#00FFF7" 
        position="left" 
        active={showMarketPanel}
        onClick={() => {
          setShowMarketPanel(!showMarketPanel);
          if (showBattlePanel) setShowBattlePanel(false);
        }}
      >
        Market Actions {showMarketPanel ? '-' : '+'}
      </BottomTab>
      
      <BottomTab 
        color="#FF3EC9" 
        position="right" 
        active={showBattlePanel}
        onClick={() => {
          setShowBattlePanel(!showBattlePanel);
          if (showMarketPanel) setShowMarketPanel(false);
        }}
      >
        Battle Log {showBattlePanel ? '-' : '+'}
      </BottomTab>

      {/* Main Battle Arena */}
      <Box sx={{ 
        position: 'relative', 
        height: 'calc(100vh - 180px)', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2
      }}>
        
        
        {/* VS Badge */}
        <VsBadge>
          <NeonText variant="h1" color="#FF8C00" glowIntensity={2}>VS</NeonText>
        </VsBadge>
        
        {/* Left Character - Sloth */}
        <CharacterContainer 
          position="left" 
          ref={slothRef}
          active={attackAnimation.left}
          sx={{ position: 'absolute', left: isMobile ? '15%' : '25%', bottom: '8%' }}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/assets/images/sloth.png`} 
            alt="Sloth" 
            style={{ 
              height: getCharacterSize(),
              filter: `drop-shadow(0 0 20px rgba(0, 255, 247, ${healthScores[species2.id] / 150}))`
            }} 
          />
          
          {/* Health bar */}
          <Box sx={{ width: isMobile ? 200 : 250, mt: 2 }}>
            <FightingGameHealthBar 
              value={healthScores[species2.id] || 50} 
              position="left"
            >
              <Box className="health-nodes">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Box 
                    key={i} 
                    className="node" 
                  />
                ))}
              </Box>
            </FightingGameHealthBar>
          </Box>
          
          {/* Current Move Display */}
          {currentMoves[species2.id] && (
            <Zoom in={true}>
              <Box 
                sx={{ 
                  mt: 1, 
                  py: 0.5, 
                  px: 1.5, 
                  bgcolor: '#00FFF7', 
                  borderRadius: 20,
                  border: '1px solid rgba(0, 255, 247, 0.5)',
                  display: 'inline-block',
                  boxShadow: '0 0 15px #00FFF7, 0 0 8px #00FFF7'
                }}
              >
                <Typography 
                  sx={{ 
                    color: '#000',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}
                >
                  {currentMoves[species2.id].name}
                </Typography>
              </Box>
            </Zoom>
          )}
        </CharacterContainer>
        
        {/* Right Character - Monarch */}
        <CharacterContainer 
          position="right" 
          ref={monarchRef}
          active={attackAnimation.right}
          sx={{ position: 'absolute', right: isMobile ? '15%' : '25%', bottom: '8%' }}
        >
          <img 
            src={`${process.env.PUBLIC_URL}/assets/images/monarch.png`} 
            alt="Monarch" 
            style={{ 
              height: getCharacterSize(),
              filter: `drop-shadow(0 0 20px rgba(255, 140, 0, ${healthScores[species1.id] / 150}))`
            }} 
          />
          
          {/* Health bar */}
          <Box sx={{ width: isMobile ? 200 : 250, mt: 2 }}>
            <FightingGameHealthBar 
              value={healthScores[species1.id] || 50} 
              position="right"
            >
              <Box className="health-nodes">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Box 
                    key={i} 
                    className="node" 
                  />
                ))}
              </Box>
            </FightingGameHealthBar>
          </Box>
          
          {/* Current Move Display - Fixed to not be reversed */}
          {currentMoves[species1.id] && (
            <Zoom in={true}>
              <Box 
                sx={{ 
                  mt: 1, 
                  py: 0.5, 
                  px: 1.5, 
                  bgcolor: '#FF8C00', 
                  borderRadius: 20,
                  border: '1px solid rgba(255, 140, 0, 0.5)',
                  display: 'inline-block',
                  boxShadow: '0 0 15px #FF8C00, 0 0 8px #FF8C00',
                }}
              >
                <Typography 
                  sx={{ 
                    color: '#000',
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '1px'
                  }}
                >
                  {currentMoves[species1.id].name}
                </Typography>
              </Box>
            </Zoom>
          )}
        </CharacterContainer>
        
        {/* Slide-out Stats Panels */}
        <Slide direction="right" in={showLeftStats} mountOnEnter unmountOnExit>
          <StatsPanel position="left" color="#FF3EC9">
            {/* Buffs Panel */}
            <StatItem color="#FF3EC9" panelType="buff">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  mb: 2,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Buffs
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <BuffIcon active={sloth1Buffs.power} color="#FFD93D">
                  <FlashOnIcon />
                </BuffIcon>
                <BuffIcon active={sloth1Buffs.volume} color="#00FFF7">
                  <BarChartIcon />
                </BuffIcon>
                <BuffIcon active={sloth1Buffs.volatility} color="#A24DFF">
                  <ShowChartIcon />
                </BuffIcon>
              </Box>
            </StatItem>
            
            {/* Volatility Panel */}
            <StatItem color="#FF3EC9" panelType="volatility">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Volatility
              </Typography>
              
              <VolatilityMeter value={tokenData[species2.id]?.volatility || 0.3} color="#FF3EC9">
                <Box className="value">{formatVolatility(tokenData[species2.id]?.volatility)}</Box>
                <Box className="volatility-line" />
              </VolatilityMeter>
            </StatItem>
            
            {/* Price Streak Panel */}
            <StatItem color="#FF3EC9">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Price Streak
              </Typography>
              <PriceStreakLine color1="#FF3EC9" color2="#FFD93D" />
            </StatItem>
            
            {/* Combo Panel */}
            <StatItem color="#FF3EC9" panelType="buff">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Combo
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <BuffIcon active={slothCombo >= 0.33} color="#FF3EC9">1</BuffIcon>
                <BuffIcon active={slothCombo >= 0.66} color="#FF3EC9">2</BuffIcon>
                <BuffIcon active={slothCombo >= 0.9} color="#FF3EC9">3</BuffIcon>
              </Box>
            </StatItem>
            
            {/* Market Data Panel */}
            <StatItem color="#FF3EC9">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Market Data
              </Typography>
              
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Price:
                  </Typography>
                  <Typography sx={{ color: '#fff', fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                    ${(tokenData[species2.id]?.price || 0).toFixed(3)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Change (1h):
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: (tokenData[species2.id]?.priceChange || 0) >= 0 ? '#00e676' : '#f44336',
                      fontFamily: "'Manrope', sans-serif", 
                      fontWeight: 600
                    }}
                  >
                    {(tokenData[species2.id]?.priceChange || 0).toFixed(2)}%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Volume (24h):
                  </Typography>
                  <Typography sx={{ color: '#fff', fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                    {formatNumber(tokenData[species2.id]?.volume || 0)}
                  </Typography>
                </Box>
              </Box>
            </StatItem>
            
            {/* Alerts Panel */}
            {slothAlerts.length > 0 && (
              <StatItem color="#FF3EC9" panelType="alert">
                <Typography 
                  sx={{ 
                    fontFamily: "'Anton', sans-serif",
                    color: '#FF3EC9',
                    mb: 1,
                    letterSpacing: '1px',
                    textTransform: 'capitalize'
                  }}
                >
                  Alerts
                </Typography>
                
                <Box sx={{ width: '100%' }}>
                  {slothAlerts.map((alert, index) => (
                    <AlertBadge key={index} color={alert.color} sx={{ display: 'block', mb: 1 }}>
                      {alert.message}
                    </AlertBadge>
                  ))}
                </Box>
              </StatItem>
            )}
            
            {/* Close Button */}
            <IconButton 
              onClick={() => setShowLeftStats(false)}
              sx={{ 
                position: 'absolute', 
                top: 10, 
                right: 10, 
                color: '#FF3EC9',
                background: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  background: 'rgba(0,0,0,0.7)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </StatsPanel>
        </Slide>
        
        <Slide direction="left" in={showRightStats} mountOnEnter unmountOnExit>
          <StatsPanel position="right" color="#FF8C00">
            {/* Buffs Panel */}
            <StatItem color="#FF8C00" panelType="buff">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF8C00',
                  mb: 2,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Buffs
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <BuffIcon active={monarch1Buffs.power} color="#FFD93D">
                  <FlashOnIcon />
                </BuffIcon>
                <BuffIcon active={monarch1Buffs.volume} color="#00FFF7">
                  <BarChartIcon />
                </BuffIcon>
                <BuffIcon active={monarch1Buffs.volatility} color="#A24DFF">
                  <ShowChartIcon />
                </BuffIcon>
              </Box>
            </StatItem>
            
            {/* Volatility Panel */}
            <StatItem color="#FF8C00" panelType="volatility">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF8C00',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Volatility
              </Typography>
              
              <VolatilityMeter value={tokenData[species1.id]?.volatility || 0.3} color="#FF8C00">
                <Box className="value">{formatVolatility(tokenData[species1.id]?.volatility)}</Box>
                <Box className="volatility-line" />
              </VolatilityMeter>
            </StatItem>
            
            {/* Price Streak Panel */}
            <StatItem color="#FF8C00">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF8C00',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Price Streak
              </Typography>
              <PriceStreakLine color1="#FF8C00" color2="#FFD93D" />
            </StatItem>
            
            {/* Combo Panel */}
            <StatItem color="#FF8C00" panelType="buff">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF8C00',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Combo
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <BuffIcon active={monarchCombo >= 0.33} color="#FF3EC9">1</BuffIcon>
                <BuffIcon active={monarchCombo >= 0.66} color="#FF3EC9">2</BuffIcon>
                <BuffIcon active={monarchCombo >= 0.9} color="#FF3EC9">3</BuffIcon>
              </Box>
            </StatItem>
            
            {/* Market Data Panel */}
            <StatItem color="#FF8C00">
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF8C00',
                  mb: 1,
                  letterSpacing: '1px',
                  textTransform: 'capitalize'
                }}
              >
                Market Data
              </Typography>
              
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Price:
                  </Typography>
                  <Typography sx={{ color: '#fff', fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                    ${(tokenData[species1.id]?.price || 0).toFixed(3)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Change (1h):
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: (tokenData[species1.id]?.priceChange || 0) >= 0 ? '#00e676' : '#f44336',
                      fontFamily: "'Manrope', sans-serif", 
                      fontWeight: 600
                    }}
                  >
                    {(tokenData[species1.id]?.priceChange || 0).toFixed(2)}%
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ color: '#aaa', fontFamily: "'Manrope', sans-serif", fontSize: '14px' }}>
                    Volume (24h):
                  </Typography>
                  <Typography sx={{ color: '#fff', fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}>
                    {formatNumber(tokenData[species1.id]?.volume ||0)}
                  </Typography>
                </Box>
              </Box>
            </StatItem>
            
            {/* Alerts Panel */}
            {monarchAlerts.length > 0 && (
              <StatItem color="#FF8C00" panelType="alert">
                <Typography 
                  sx={{ 
                    fontFamily: "'Anton', sans-serif",
                    color: '#FF8C00',
                    mb: 1,
                    letterSpacing: '1px',
                    textTransform: 'capitalize'
                  }}
                >
                  Alerts
                </Typography>
                
                <Box sx={{ width: '100%' }}>
                  {monarchAlerts.map((alert, index) => (
                    <AlertBadge key={index} color={alert.color} sx={{ display: 'block', mb: 1 }}>
                      {alert.message}
                    </AlertBadge>
                  ))}
                </Box>
              </StatItem>
            )}
            
            {/* Close Button */}
            <IconButton 
              onClick={() => setShowRightStats(false)}
              sx={{ 
                position: 'absolute', 
                top: 10, 
                right: 10, 
                color: '#FF8C00',
                background: 'rgba(0,0,0,0.5)',
                '&:hover': {
                  background: 'rgba(0,0,0,0.7)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </StatsPanel>
        </Slide>
        
        {/* Bottom Slide-up Panels */}
        {/* Market Actions Panel */}
        <Slide direction="up" in={showMarketPanel} mountOnEnter unmountOnExit>
          <BottomPanel position="left" color="#00FFF7">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#00FFF7',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px #00FFF7',
                  fontSize: '24px',
                  textTransform: 'capitalize'
                }}
              >
                Market Actions
              </Typography>
              
              <IconButton 
                onClick={() => setShowMarketPanel(false)}
                sx={{ color: '#00FFF7' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Species selection */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                sx={{ 
                  color: '#aaa',
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: '1px',
                  mb: 1,
                  textTransform: 'capitalize'
                }}
              >
                Select Your Species
              </Typography>
              {/* Character name labels */}
        
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CyberButton
                  active={selectedSpecies === species1.id}
                  onClick={() => setSelectedSpecies(species1.id)}
                  color="#FF8C00"
                  fullWidth
                >
                  {species1.symbol}
                </CyberButton>
                <CyberButton
                  active={selectedSpecies === species2.id}
                  onClick={() => setSelectedSpecies(species2.id)}
                  color="#00FFF7"
                  fullWidth
                >
                  {species2.symbol}
                </CyberButton>
              </Box>
            </Box>
            
            {/* Action type toggle */}
            <Box sx={{ mb: 3 }}>
              <Typography 
                sx={{ 
                  color: '#aaa',
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: '1px',
                  mb: 1,
                  textTransform: 'capitalize'
                }}
              >
                Action Type
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <CyberButton
                  active={isBuying}
                  onClick={() => setIsBuying(true)}
                  color="#00e676"
                  fullWidth
                >
                  Buy
                </CyberButton>
                <CyberButton
                  active={!isBuying}
                  onClick={() => setIsBuying(false)}
                  color="#f44336"
                  fullWidth
                >
                  Sell
                </CyberButton>
              </Box>
            </Box>
            
            {/* Amount slider */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1
              }}>
                <Typography 
                  sx={{ 
                    color: '#aaa',
                    fontFamily: "'Anton', sans-serif",
                    letterSpacing: '1px',
                    textTransform: 'capitalize'
                  }}
                >
                  Amount: ${actionAmount}
                </Typography>
                <Typography 
                  sx={{ 
                    color: isBuying ? '#00e676' : '#f44336',
                    fontWeight: 'bold',
                    fontFamily: "'Manrope', sans-serif",
                    textShadow: isBuying ? '0 0 5px #00e676' : '0 0 5px #f44336',
                  }}
                >
                  {isBuying ? 'Power Up' : 'Weaken'}
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mt: 2
              }}>
                <IconButton 
                  sx={{ color: isBuying ? '#00e676' : '#f44336' }}
                  onClick={() => setActionAmount(Math.max(10, actionAmount - 10))}
                >
                  <RemoveIcon />
                </IconButton>
                
                <Box sx={{ flex: 1, mx: 1 }}>
                  <MarketCapProgressBar 
                    value={actionAmount}
                    maxValue={1000}
                    color1={isBuying ? "#00e676" : "#f44336"}
                    color2={isBuying ? "#00c853" : "#d32f2f"}
                    height={10}
                    direction="left"
                  />
                </Box>
                
                <IconButton 
                  sx={{ color: isBuying ? '#00e676' : '#f44336' }}
                  onClick={() => setActionAmount(Math.min(1000, actionAmount + 10))}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={actionAmount}
                onChange={handleAmountChange}
                style={{ 
                  width: '100%', 
                  marginTop: '10px',
                  accentColor: isBuying ? '#00e676' : '#f44336',
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  outline: 'none',
                  opacity: 0.7,
                }}
              />
            </Box>
            
            {/* Execute action button */}
            <CyberButton
              onClick={executeAction}
              disabled={!selectedSpecies}
              color={isBuying ? "#00e676" : "#f44336"}
              active={true}
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 700,
                fontSize: '18px'
              }}
            >
              {isBuying ? 'Buy Token' : 'Sell Token'}
            </CyberButton>
          </BottomPanel>
        </Slide>
        
        {/* Battle Log Panel */}
        <Slide direction="up" in={showBattlePanel} mountOnEnter unmountOnExit>
          <BottomPanel position="right" color="#FF3EC9">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography 
                sx={{ 
                  fontFamily: "'Anton', sans-serif",
                  color: '#FF3EC9',
                  letterSpacing: '1px',
                  textShadow: '0 0 5px #FF3EC9',
                  fontSize: '24px',
                  textTransform: 'capitalize'
                }}
              >
                Battle Log
              </Typography>
              
              <IconButton 
                onClick={() => setShowBattlePanel(false)}
                sx={{ color: '#FF3EC9' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box 
              sx={{ 
                height: 'calc(100% - 40px)', 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 10,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255, 62, 201, 0.5)',
                  borderRadius: 10,
                }
              }}
            >
              {battleLogs.slice(0, 15).map((log, index) => (
                <Fade in={true} key={index} timeout={300} style={{ transitionDelay: `${index * 50}ms` }}>
                  <BattleLogItem type={log.type}>
                    <Box sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      mb: 0.5
                    }}>
                      <Typography 
                        sx={{ 
                          color: '#aaa', 
                          fontSize: '0.7rem',
                          fontFamily: "'Manrope', monospace",
                        }}
                      >
                        {log.timestamp}
                      </Typography>
                      <Typography 
                        sx={{ 
                          fontSize: '0.7rem',
                          fontFamily: "'Anton', sans-serif",
                          letterSpacing: '1px',
                          color: log.type === 'event' 
                            ? '#FF8C00' 
                            : log.type === 'attack' 
                              ? '#FF3EC9' 
                              : '#00e676',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}
                      >
                        {log.type}
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        color: '#fff',
                        fontFamily: "'Manrope', sans-serif", 
                        fontWeight: 500
                      }}
                    >
                      {log.message}
                    </Typography>
                  </BattleLogItem>
                </Fade>
              ))}
            </Box>
          </BottomPanel>
        </Slide>
      </Box>

      {/* Fullscreen Overlays for Events */}
      <FullscreenOverlay visible={showFightOverlay} color="#FF8C00">
        <NeonText 
          variant="h1" 
          color="#FF8C00" 
          glowIntensity={3}
          sx={{ 
            fontSize: isMobile ? '80px' : '120px', 
            animation: 'pulse 0.5s infinite alternate',
            textTransform: 'uppercase'
          }}
        >
          FIGHT!
        </NeonText>
      </FullscreenOverlay>
      
      <FullscreenOverlay visible={showKoOverlay} color="#FF3EC9">
        <NeonText 
          variant="h1" 
          color="#FF3EC9" 
          glowIntensity={3}
          sx={{ 
            fontSize: isMobile ? '80px' : '120px', 
            animation: 'pulse 0.5s infinite alternate',
            textTransform: 'uppercase'
          }}
        >
          K.O.!
        </NeonText>
      </FullscreenOverlay>
      
      {/* Global CSS for animations */}
      <style jsx global>{`
        @keyframes moveStreak {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes moveVolatility {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes moveGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% {
            text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor;
            transform: scale(1);
          }
          100% {
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
            transform: scale(1.05);
          }
        }
        
        @keyframes attackLeft {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(50px);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        @keyframes attackRight {
          0% {
            transform: scaleX(-1) translateX(0);
          }
          25% {
            transform: scaleX(-1) translateX(50px);
          }
          100% {
            transform: scaleX(-1) translateX(0);
          }
        }
      `}</style>
    </BattleContainer>
  );
};

export default Battle;