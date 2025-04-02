import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent,
  CardActions,
  LinearProgress,
  Fade
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../hooks/useWeb3';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { connectWallet, isConnected } = useWeb3();
  const [loading, setLoading] = useState(true);
  
  // Mock data for tokens that would come from API/contract
  const [tokensData, setTokensData] = useState({
    toed: {
      symbol: '$3TOED',
      raised: 6280000, // $6.28M in USDT
      target: 7000000,  // $7M in USDT
      logo: '/assets/images/toed-logo.png',
    },
    mnrch: {
      symbol: '$MNRCH',
      raised: 6280000, // $6.28M in USDT
      target: 7000000,  // $7M in USDT
      logo: '/assets/images/mnrch-logo.png',
    }
  });

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Navigate to battle page
  const handlePlay = (token) => {
    navigate('/battle', { state: { selectedToken: token } });
  };

  // Calculate progress percentage
  const calculateProgress = (raised, target) => {
    return (raised / target) * 100;
  };

  // Format currency in millions
  const formatCurrency = (amount) => {
    return `$${(amount / 1000000).toFixed(2)}M`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        pb: 10,
        pt: 5
      }}
    >
      {/* Logo and title */}
      <Fade in={!loading} timeout={1000}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h1" 
            className="neon-text"
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              mb: 2,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #00e5ff, 0 0 40px #00e5ff',
              position: 'relative',
              display: 'inline-block',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(45deg, transparent 45%, #00e5ff 45%, #00e5ff 55%, transparent 55%)',
                backgroundSize: '300% 100%',
                animation: 'glitch 1s infinite',
                opacity: 0.3,
                zIndex: -1,
              },
            }}
          >
            ✧ FINAL TRADE
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              px: 2
            }}
          >
            The ultimate marketplace battleground where species tokens fight for dominance. 
            Your trades determine the winner.
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexWrap: 'wrap'
            }}
          >
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => window.open('/greypaper.pdf', '_blank')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 'bold',
                backdropFilter: 'blur(5px)',
                background: 'rgba(0, 229, 255, 0.2)',
                border: '1px solid rgba(0, 229, 255, 0.5)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(0, 229, 255, 0.4)',
                  boxShadow: '0 0 20px rgba(0, 229, 255, 0.7)',
                },
              }}
            >
              Read Greypaper
            </Button>
            
            {!isConnected && (
              <Button 
                variant="contained" 
                color="secondary"
                onClick={connectWallet}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(5px)',
                  background: 'rgba(255, 145, 0, 0.2)',
                  border: '1px solid rgba(255, 145, 0, 0.5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 145, 0, 0.4)',
                    boxShadow: '0 0 20px rgba(255, 145, 0, 0.7)',
                  },
                }}
              >
                Connect Wallet
              </Button>
            )}
          </Box>
        </Box>
      </Fade>

      {/* Token cards */}
      <Container maxWidth="lg">
        <Fade in={!loading} timeout={1500}>
          <Grid container spacing={3} justifyContent="center">
            {/* TOED Token Card */}
            <Grid item xs={12} md={6} lg={5}>
              <Card
                sx={{
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundImage: 'linear-gradient(135deg, rgba(30, 40, 30, 0.7) 0%, rgba(20, 30, 20, 0.9) 100%)',
                  border: '1px solid rgba(76, 175, 80, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(76, 175, 80, 0.4)',
                  }
                }}
              >
                {/* Background glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(ellipse at center, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0) 70%)',
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                />
                
                <CardContent sx={{ p: 4, position: 'relative' }}>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    className="monarch-neon"
                    sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      textShadow: '0 0 5px #4caf50, 0 0 10px #4caf50, 0 0 15px #4caf50',
                    }}
                  >
                    {tokensData.toed.symbol}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    USDT Raised: {formatCurrency(tokensData.toed.raised)} / {formatCurrency(tokensData.toed.target)}
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 3, position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress(tokensData.toed.raised, tokensData.toed.target)} 
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(76, 175, 80, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #388e3c 0%, #4caf50 100%)',
                          boxShadow: '0 0 10px rgba(76, 175, 80, 0.7)',
                        },
                      }}
                    />
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button 
                    size="large" 
                    fullWidth
                    variant="contained"
                    sx={{
                      py: 1.5,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #388e3c 0%, #4caf50 100%)',
                      boxShadow: '0 0 15px rgba(76, 175, 80, 0.5)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #4caf50 0%, #66bb6a 100%)',
                        boxShadow: '0 0 20px rgba(76, 175, 80, 0.7)',
                      }
                    }}
                    onClick={() => handlePlay('toed')}
                  >
                    Play
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            
            {/* MNRCH Token Card */}
            <Grid item xs={12} md={6} lg={5}>
              <Card 
                sx={{
                  height: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundImage: 'linear-gradient(135deg, rgba(40, 30, 40, 0.7) 0%, rgba(30, 20, 30, 0.9) 100%)',
                  border: '1px solid rgba(156, 39, 176, 0.3)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(156, 39, 176, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(156, 39, 176, 0.4)',
                  }
                }}
              >
                {/* Background glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(ellipse at center, rgba(156, 39, 176, 0.3) 0%, rgba(156, 39, 176, 0) 70%)',
                    opacity: 0.5,
                    pointerEvents: 'none',
                  }}
                />
                
                <CardContent sx={{ p: 4, position: 'relative' }}>
                  <Typography 
                    variant="h3" 
                    component="div" 
                    className="sloth-neon"
                    sx={{ 
                      mb: 2, 
                      fontWeight: 'bold',
                      textShadow: '0 0 5px #9c27b0, 0 0 10px #9c27b0, 0 0 15px #9c27b0',
                    }}
                  >
                    {tokensData.mnrch.symbol}
                  </Typography>
                  
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    USDT Raised: {formatCurrency(tokensData.mnrch.raised)} / {formatCurrency(tokensData.mnrch.target)}
                  </Typography>
                  
                  <Box sx={{ mt: 3, mb: 3, position: 'relative' }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={calculateProgress(tokensData.mnrch.raised, tokensData.mnrch.target)} 
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'rgba(156, 39, 176, 0.2)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 5,
                          background: 'linear-gradient(90deg, #7b1fa2 0%, #9c27b0 100%)',
                          boxShadow: '0 0 10px rgba(156, 39, 176, 0.7)',
                        },
                      }}
                    />
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 4, pt: 0 }}>
                  <Button 
                    size="large" 
                    fullWidth
                    variant="contained"
                    sx={{
                      py: 1.5,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #7b1fa2 0%, #9c27b0 100%)',
                      boxShadow: '0 0 15px rgba(156, 39, 176, 0.5)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #9c27b0 0%, #ab47bc 100%)',
                        boxShadow: '0 0 20px rgba(156, 39, 176, 0.7)',
                      }
                    }}
                    onClick={() => handlePlay('mnrch')}
                  >
                    Play
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Fade>
        
        {/* VS Badge */}
        <Fade in={!loading} timeout={2000}>
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: 80, sm: 120 },
              height: { xs: 80, sm: 120 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              zIndex: 10,
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(255, 234, 0, 0.3) 0%, rgba(255, 234, 0, 0) 70%)',
                animation: 'pulse 2s infinite',
              }}
            />
            
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#ffea00',
                textShadow: '0 0 5px #ffea00, 0 0 10px #ffea00, 0 0 15px #ffea00',
                position: 'relative',
                textTransform: 'uppercase',
              }}
            >
              VS
            </Typography>
          </Box>
        </Fade>
        
        {/* Battle stats section - optional */}
        <Fade in={!loading} timeout={2500}>
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              className="neon-text"
              sx={{ mb: 4 }}
            >
              SPECIES WAR STATISTICS
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={6} sm={3}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(20, 20, 30, 0.6)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography variant="h2" className="neon-text">142</Typography>
                  <Typography variant="body1" color="text.secondary">Active Battles</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(20, 20, 30, 0.6)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography variant="h2" className="neon-text">5.2M</Typography>
                  <Typography variant="body1" color="text.secondary">24h Volume</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(20, 20, 30, 0.6)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography variant="h2" className="neon-text">3.7K</Typography>
                  <Typography variant="body1" color="text.secondary">Total Players</Typography>
                </Box>
              </Grid>
              
              <Grid item xs={6} sm={3}>
                <Box 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(20, 20, 30, 0.6)',
                    borderRadius: 2,
                    border: '1px solid rgba(0, 229, 255, 0.3)',
                  }}
                >
                  <Typography variant="h2" className="neon-text">12.5M</Typography>
                  <Typography variant="body1" color="text.secondary">Total Market Cap</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Home;
