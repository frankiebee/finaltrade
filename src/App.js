import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Context Providers
import { Web3Provider } from './contexts/Web3Context';
import { GameProvider } from './contexts/GameContext';

// Pages
import Home from './pages/Home';
import Battle from './pages/Battle';
import Presale from './pages/Presale';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import the image path utilities
import { IMAGES } from './utils/imagePaths';

// Create a cyberpunk theme instance with enhanced colors and styling
const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FFF7', // Vibrant cyan
      dark: '#00b8d4',
      light: '#18ffff',
    },
    secondary: {
      main: '#FF3EC9', // Hot pink
      dark: '#c51162',
      light: '#ff79b0',
    },
    background: {
      default: '#070b34', // Deep blue background
      paper: 'rgba(7, 11, 52, 0.85)', // Semi-transparent panel background
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#FFD93D', // Bright yellow
    },
    success: {
      main: '#00e676',
    },
    info: {
      main: '#2979ff',
    },
    // Custom colors
    monarch: {
      main: '#FF8C00', // Monarch butterfly orange
      light: '#ffab40',
      dark: '#c25e00',
      contrastText: '#ffffff',
    },
    sloth: {
      main: '#00FFF7', // Sloth cyan
      light: '#5fffd7',
      dark: '#00b8d4',
      contrastText: '#ffffff',
    },
    volatility: {
      main: '#A24DFF', // Purple for volatility
      light: '#b66dff',
      dark: '#7a36c7',
      contrastText: '#ffffff',
    },
    fight: {
      main: '#FF3D00', // Bright orange-red for fight text
      light: '#ff6333',
      dark: '#b22a00',
      contrastText: '#ffffff',
    }
  },
  typography: {
    // Primary headers in Anton for impact
    fontFamily: "'Manrope', 'Satoshi', sans-serif",
    h1: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '3.5rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h2: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '3rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    },
    h3: {
      fontFamily: "'Anton', sans-serif",
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h4: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    subtitle1: {
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    subtitle2: {
      fontFamily: "'Satoshi', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: '1rem',
    },
    body2: {
      fontFamily: "'Manrope', sans-serif",
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: "'Bebas Neue', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: "'Space Mono', monospace",
      fontSize: '0.75rem',
      letterSpacing: '0.03em',
    },
    overline: {
      fontFamily: "'Bebas Neue', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'uppercase',
          fontWeight: 600,
          letterSpacing: '0.05em',
          fontFamily: "'Bebas Neue', sans-serif",
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&::before': { // Angular clip path
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            pointerEvents: 'none',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00FFF7 0%, #0088ff 100%)',
          border: '2px solid #00FFF7',
          boxShadow: '0 0 10px rgba(0, 255, 247, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #18ffff 0%, #2979ff 100%)',
            boxShadow: '0 0 15px rgba(0, 255, 247, 0.7)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #FF3EC9 0%, #A24DFF 100%)',
          border: '2px solid #FF3EC9',
          boxShadow: '0 0 10px rgba(255, 62, 201, 0.5)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ff66d9 0%, #b978ff 100%)',
            boxShadow: '0 0 15px rgba(255, 62, 201, 0.7)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        outlinedPrimary: {
          borderColor: '#00FFF7',
          color: '#00FFF7',
          '&:hover': {
            background: 'rgba(0, 255, 247, 0.1)',
            boxShadow: '0 0 10px rgba(0, 255, 247, 0.3)',
            borderColor: '#00FFF7',
          },
        },
        outlinedSecondary: {
          borderColor: '#FF3EC9',
          color: '#FF3EC9',
          '&:hover': {
            background: 'rgba(255, 62, 201, 0.1)',
            boxShadow: '0 0 10px rgba(255, 62, 201, 0.3)',
            borderColor: '#FF3EC9',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          position: 'relative',
          overflow: 'hidden',
          background: 'rgba(7, 11, 52, 0.85)',
          backdropFilter: 'blur(10px)',
          '&::before': { // Glowing border effect
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            padding: '2px',
            background: 'linear-gradient(135deg, rgba(0, 255, 247, 0.6), rgba(0, 53, 150, 0.3))',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            pointerEvents: 'none',
          },
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 255, 247, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(18, 25, 79, 0.95), rgba(7, 11, 52, 0.95))',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 255, 247, 0.2)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // In MuiCssBaseline styleOverrides
body: {
  // Other properties...
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/neon_hum.png)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  // etc.
}
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
        },
        barColorPrimary: {
          backgroundImage: 'linear-gradient(90deg, #00FFF7, #FF3EC9)',
          boxShadow: '0 0 10px #00FFF7, 0 0 5px #FF3EC9',
        },
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 8,
          '& .MuiSlider-track': {
            border: 'none',
            background: 'linear-gradient(90deg, #00FFF7, #FF3EC9)',
            boxShadow: '0 0 10px #00FFF7, 0 0 5px #FF3EC9',
          },
          '& .MuiSlider-thumb': {
            height: 20,
            width: 20,
            backgroundColor: '#00FFF7',
            border: '2px solid currentColor',
            boxShadow: '0 0 10px #00FFF7',
            '&:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: '0 0 15px #00FFF7',
            },
          },
          '& .MuiSlider-rail': {
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#00FFF7',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 247, 0.1)',
          },
        },
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: "'Space Mono', monospace",
          '& fieldset': {
            borderWidth: 2,
            borderColor: 'rgba(0, 255, 247, 0.5)',
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
          },
          '&:hover fieldset': {
            borderColor: '#00FFF7',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#00FFF7',
            boxShadow: '0 0 10px rgba(0, 255, 247, 0.3)',
          },
        },
        input: {
          padding: '12px',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: "'Space Mono', monospace",
          },
        },
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: '0.5px',
        },
      }
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Web3Provider>
        <GameProvider>
          <Router basename="/finaltrade">
            <div className="app-container">
              <main className="main-content" style={{ minHeight: '100vh' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/battle" element={<Battle />} />
                  <Route path="/presale" element={<Presale />} />
                  <Route path="/stats" element={<Statistics />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </GameProvider>
      </Web3Provider>
    </ThemeProvider>
  );
}

export default App;