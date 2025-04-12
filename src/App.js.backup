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
import SimpleImageTest from './pages/SimpleImageTest';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Create a cyberpunk theme instance
const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e5ff', // Bright cyan
      dark: '#00b8d4',
      light: '#18ffff',
    },
    secondary: {
      main: '#ff9100', // Bright orange
      dark: '#e65100',
      light: '#ffab40',
    },
    background: {
      default: '#0a0a0f',
      paper: 'rgba(20, 20, 30, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    error: {
      main: '#ff1744',
    },
    warning: {
      main: '#ffea00',
    },
    success: {
      main: '#00e676',
    },
    info: {
      main: '#2979ff',
    },
    monarch: {
      main: '#4caf50', // Green for $3TOED
      contrastText: '#ffffff',
    },
    sloth: {
      main: '#9c27b0', // Purple for $MNRCH
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Rajdhani', 'Orbitron', 'Roboto', sans-serif",
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
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
          boxShadow: '0 0 10px rgba(0, 229, 255, 0.5)',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00e5ff 0%, #0077ff 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #18ffff 0%, #2979ff 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #ff9100 0%, #ff3d00 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #ffab40 0%, #ff6e40 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 229, 255, 0.3)',
          backdropFilter: 'blur(10px)',
          background: 'rgba(20, 20, 30, 0.8)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30, 30, 45, 0.95), rgba(15, 15, 25, 0.95))',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 229, 255, 0.2)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          scrollbarColor: '#00e5ff #0a0a0f',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#0a0a0f',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#00e5ff',
            borderRadius: '4px',
          },
          backgroundImage: `url(https://saraswathi.github.io/finaltrade/assets/images/cyberpunk-alley-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 10, 15, 0.7)',
            zIndex: -1,
          }
        }
      }
    }
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
              <Header />
              <main className="main-content" style={{ minHeight: 'calc(100vh - 160px)', padding: '24px 0' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/battle" element={<Battle />} />
                  <Route path="/presale" element={<Presale />} />
                  <Route path="/stats" element={<Statistics />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/imagetest" element={<SimpleImageTest />} />
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