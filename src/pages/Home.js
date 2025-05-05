// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, Box, Typography, Button, Divider } from '@mui/material';
import PageContainer from '../components/common/PageContainer';

const Home = () => {
  const navigate = useNavigate();

  const handlePlay = (species) => {
    // Navigate to battle page with the selected species
    navigate('/battle', { state: { species } });
  };

  // Neon glow animation style
  const neonPulse = {
    animation: 'pulse 2s infinite',
  };

  return (
    <PageContainer backgroundImage="Solar_Cyber_Arena.png">
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8} mt={4}>
          <Typography 
            variant="h1" 
            className="neon-text"
            sx={{ 
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontFamily: "'Orbitron', sans-serif",
              mb: 1,
              textShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff, 0 0 30px #00e5ff',
            }}
          >
            FINAL TRADE
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              opacity: 0.9,
              fontFamily: "'Rajdhani', sans-serif",
              mb: 4,
              textShadow: '0 0 5px #00e5ff',
              letterSpacing: '0.1em',
            }}
          >
            TRADE OR BE TRADED
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 6 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              className="neon-button"
              onClick={() => navigate('/presale')}
              sx={{ 
                borderRadius: 8, 
                px: 4, 
                py: 1.5,
                ...neonPulse
              }}
            >
              JOIN PRESALE
            </Button>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              onClick={() => window.open('https://magnificent-selfie-913915.framer.app/', '_blank')}
              sx={{ 
                borderRadius: 8, 
                px: 4, 
                py: 1.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                }
              }}
            >
              READ GREYPAPER
            </Button>
          </Box>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          <Grid item xs={12} md={6} lg={5}>
            <Card 
              sx={{ 
                bgcolor: 'rgba(25, 25, 35, 0.7)', 
                border: '1px solid rgba(255, 112, 67, 0.5)',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(255, 112, 67, 0.5)',
                  '&::before': {
                    opacity: 1
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 3,
                  padding: '1.5px',
                  background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.8), rgba(150, 50, 20, 0.4))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }
              }}
            >
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/monarch.png`} 
                  alt="Monarch Butterfly" 
                  style={{ 
                    height: 180, 
                    filter: 'drop-shadow(0 0 8px rgba(255, 112, 67, 0.8))',
                    marginBottom: 16
                  }} 
                />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: '#ff7043', 
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: '0 0 10px rgba(255, 112, 67, 0.8), 0 0 20px rgba(255, 112, 67, 0.4)',
                    mb: 1
                  }}
                >
                  MONARCH
                </Typography>
                <Box sx={{ 
                  display: 'inline-block', 
                  px: 2, 
                  py: 0.5, 
                  bgcolor: 'rgba(255, 112, 67, 0.2)', 
                  borderRadius: 2,
                  mb: 3,
                  border: '1px solid rgba(255, 112, 67, 0.3)',
                }}>
                  <Typography variant="body2" sx={{ color: '#ff9770', letterSpacing: 1 }}>
                    <em>VOLATILE • HIGH-RISK • AGGRESSIVE</em>
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3, borderColor: 'rgba(255, 112, 67, 0.3)' }} />
                
                <Typography variant="body1" sx={{ mb: 4, color: '#eee' }}>
                  Choose $MNRCH for high volatility and devastating attacks. Perfect for aggressive traders seeking massive gains—or catastrophic losses.
                </Typography>
                
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => handlePlay('monarch')}
                  sx={{
                    background: 'linear-gradient(135deg, #ff7043 0%, #ff3d00 100%)',
                    boxShadow: '0 0 15px rgba(255, 112, 67, 0.5)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff8a65 0%, #ff5722 100%)',
                      boxShadow: '0 0 25px rgba(255, 112, 67, 0.8)',
                    },
                    borderRadius: 8,
                    px: 4,
                    py: 1.5
                  }}
                >
                  FIGHT AS $MNRCH
                </Button>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <Card 
              sx={{ 
                bgcolor: 'rgba(25, 25, 35, 0.7)', 
                border: '1px solid rgba(0, 229, 255, 0.5)',
                transition: 'all 0.3s ease',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.7), 0 0 20px rgba(0, 229, 255, 0.5)',
                  '&::before': {
                    opacity: 1
                  }
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: 3,
                  padding: '1.5px',
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.8), rgba(0, 53, 150, 0.4))',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }
              }}
            >
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <img 
                  src={`${process.env.PUBLIC_URL}/assets/images/sloth.png`} 
                  alt="Three-toed Sloth" 
                  style={{ 
                    height: 180, 
                    filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))',
                    marginBottom: 16
                  }} 
                />
                <Typography 
                  variant="h3" 
                  sx={{ 
                    color: '#00e5ff', 
                    fontFamily: "'Orbitron', sans-serif",
                    textShadow: '0 0 10px rgba(0, 229, 255, 0.8), 0 0 20px rgba(0, 229, 255, 0.4)',
                    mb: 1
                  }}
                >
                  THREE-TOED
                </Typography>
                <Box sx={{ 
                  display: 'inline-block', 
                  px: 2, 
                  py: 0.5, 
                  bgcolor: 'rgba(0, 229, 255, 0.2)', 
                  borderRadius: 2,
                  mb: 3,
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                }}>
                  <Typography variant="body2" sx={{ color: '#7adfff', letterSpacing: 1 }}>
                    <em>STABLE • STRATEGIC • RESILIENT</em>
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3, borderColor: 'rgba(0, 229, 255, 0.3)' }} />
                
                <Typography variant="body1" sx={{ mb: 4, color: '#eee' }}>
                  Choose $3TOED for stability and strategic defense. Perfect for methodical traders who prefer steady gains and stronger protection against market volatility.
                </Typography>
                
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => handlePlay('sloth')}
                  sx={{
                    background: 'linear-gradient(135deg, #00e5ff 0%, #0091ea 100%)',
                    boxShadow: '0 0 15px rgba(0, 229, 255, 0.5)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #18ffff 0%, #00b0ff 100%)',
                      boxShadow: '0 0 25px rgba(0, 229, 255, 0.8)',
                    },
                    borderRadius: 8,
                    px: 4,
                    py: 1.5
                  }}
                >
                  FIGHT AS $3TOED
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 8, 
            mb: 4, 
            borderRadius: 4,
            p: 4,
            background: 'linear-gradient(180deg, rgba(20, 20, 35, 0.8), rgba(10, 10, 20, 0.4))',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 4,
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(255, 112, 67, 0.4), rgba(0, 229, 255, 0.4))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              pointerEvents: 'none',
            }
          }}
        >
          <Typography 
            variant="h4" 
            className="neon-text" 
            sx={{ 
              mb: 2,
              textShadow: '0 0 10px #00e5ff, 0 0 20px #00e5ff',
            }}
          >
            MARKET-DRIVEN BATTLES
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: '800px', mx: 'auto', color: '#ddd' }}>
            In Final Trade, your market actions determine your fighting power. Buy to strengthen attacks, 
            sell to weaken opponents, and stake to unlock special abilities. The first species to reach 
            $1M market cap claims victory!
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => navigate('/battle')}
            sx={{ 
              borderRadius: 8, 
              px: 4, 
              py: 1.5,
              background: 'linear-gradient(135deg, #ff9100 0%, #ff3d00 100%)',
              boxShadow: '0 0 15px rgba(255, 145, 0, 0.5)',
              '&:hover': {
                background: 'linear-gradient(135deg, #ffab40 0%, #ff6e40 100%)',
                boxShadow: '0 0 25px rgba(255, 145, 0, 0.7)',
              },
            }}
          >
            ENTER THE ARENA
          </Button>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default Home;