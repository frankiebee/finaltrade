import React, { useContext, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  LinearProgress, 
  Card, 
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Switch,
  FormControlLabel,
  Slider,
  CircularProgress
} from '@mui/material';
import { GameContext } from '../contexts/GameContext';

// Character display component
const Character = ({ tokenConfig, tokenId, health, currentMove }) => {
  const isSpecies1 = tokenId === tokenConfig.species1.id;
  const emoji = isSpecies1 ? tokenConfig.species1.emoji : tokenConfig.species2.emoji;
  const color = isSpecies1 ? 'monarch' : 'sloth';
  const symbol = isSpecies1 ? tokenConfig.species1.symbol : tokenConfig.species2.symbol;
  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography 
        variant="h4" 
        className={isSpecies1 ? "monarch-neon" : "sloth-neon"}
        sx={{ mb: 1 }}
      >
        {symbol}
      </Typography>
      
      <Paper 
        elevation={3} 
        sx={{ 
          height: 200, 
          width: 200, 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: `${color}.dark`,
          border: `2px solid ${color}.main`,
          animation: currentMove ? 'pulse 0.5s' : 'none'
        }}
      >
        <Typography variant="h1">{emoji}</Typography>
      </Paper>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" gutterBottom>Health</Typography>
        <LinearProgress 
          variant="determinate" 
          value={health} 
          color={health > 50 ? 'success' : health > 20 ? 'warning' : 'error'}
          sx={{ height: 20, borderRadius: 5 }}
        />
        
        <Typography variant="body1" sx={{ mt: 1 }}>
          Current Move: {currentMove ? `${currentMove.moveId}: ${currentMove.name}` : 'None'}
        </Typography>
      </Box>
    </Box>
  );
};

// Metrics display component
const MetricsDisplay = ({ tokenConfig, tokenId, metrics }) => {
  const isSpecies1 = tokenId === tokenConfig.species1.id;
  const color = isSpecies1 ? 'monarch' : 'sloth';
  const symbol = isSpecies1 ? tokenConfig.species1.symbol : tokenConfig.species2.symbol;
  
  return (
    <Card sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="h6" color={`${color}.main`} gutterBottom>{symbol} Metrics</Typography>
        
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2">Price:</Typography>
            <Typography variant="body1" fontWeight="bold">${metrics.price.toFixed(4)}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2">1h Change:</Typography>
            <Typography 
              variant="body1" 
              fontWeight="bold"
              className={metrics.priceChange > 0 ? 'price-up' : 'price-down'}
            >
              {metrics.priceChange > 0 ? '+' : ''}{metrics.priceChange.toFixed(2)}%
            </Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2">24h Volume:</Typography>
            <Typography variant="body1" fontWeight="bold">${metrics.volume.toLocaleString()}</Typography>
          </Grid>
          
          <Grid item xs={6}>
            <Typography variant="body2">Market Cap:</Typography>
            <Typography variant="body1" fontWeight="bold">${metrics.marketCap.toLocaleString()}</Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2">Volatility Score:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LinearProgress 
                variant="determinate" 
                value={metrics.volatility * 100} 
                color={metrics.volatility > 0.65 ? 'error' : 'info'}
                sx={{ flexGrow: 1, height: 10, borderRadius: 5 }}
              />
              <Typography variant="body1" fontWeight="bold" sx={{ ml: 1 }}>
                {(metrics.volatility).toFixed(2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Battle log component
const BattleLog = ({ logs }) => {
  return (
    <Paper sx={{ height: 300, overflow: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>Battle Log</Typography>
      <List>
        {logs.map((log, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText 
                primary={log.message}
                secondary={log.timestamp}
                primaryTypographyProps={{
                  color: log.type === 'attack' ? 'error.main' : 
                          log.type === 'buff' ? 'success.main' : 'info.main'
                }}
              />
            </ListItem>
            {index !== logs.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

// Market actions component
const MarketActions = ({ tokenConfig, onAction }) => {
  const [amount, setAmount] = React.useState(100);
  
  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>Market Actions</Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography id="amount-slider" gutterBottom>Amount: ${amount}</Typography>
        <Slider
          aria-labelledby="amount-slider"
          value={amount}
          onChange={(e, newValue) => setAmount(newValue)}
          min={10}
          max={1000}
          step={10}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `$${value}`}
        />
      </Box>
      
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="monarch" 
            fullWidth
            onClick={() => onAction('buy', tokenConfig.species1.id, amount)}
          >
            Buy {tokenConfig.species1.symbol}
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth
            onClick={() => onAction('sell', tokenConfig.species1.id, amount)}
          >
            Sell {tokenConfig.species1.symbol}
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="sloth" 
            fullWidth
            onClick={() => onAction('buy', tokenConfig.species2.id, amount)}
          >
            Buy {tokenConfig.species2.symbol}
          </Button>
        </Grid>
        
        <Grid item xs={6}>
          <Button 
            variant="contained" 
            color="error" 
            fullWidth
            onClick={() => onAction('sell', tokenConfig.species2.id, amount)}
          >
            Sell {tokenConfig.species2.symbol}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

// Market progress component
const MarketProgress = ({ tokenConfig, tokenData }) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Race to $1M Market Cap</Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2">
            {tokenConfig.species1.symbol}: ${tokenData[tokenConfig.species1.id].marketCap.toLocaleString()}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(100, (tokenData[tokenConfig.species1.id].marketCap / 1000000) * 100)} 
            color="monarch"
            sx={{ height: 20, borderRadius: 5 }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="body2">
            {tokenConfig.species2.symbol}: ${tokenData[tokenConfig.species2.id].marketCap.toLocaleString()}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(100, (tokenData[tokenConfig.species2.id].marketCap / 1000000) * 100)} 
            color="sloth"
            sx={{ height: 20, borderRadius: 5 }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const Battle = () => {
  const { 
    tokenConfig,
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
  } = useContext(GameContext);
  
  // Initial fetch
  useEffect(() => {
    fetchTokenData();
  }, [fetchTokenData]);
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, mt: 6 }}>
        <Typography variant="h4" className="neon-text">Final Trade Battle Arena</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
          <FormControlLabel
            control={
              <Switch
                checked={autoUpdate}
                onChange={(e) => setAutoUpdate(e.target.checked)}
                color="primary"
              />
            }
            label="Auto Update"
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={useMockData}
                onChange={(e) => setUseMockData(e.target.checked)}
                color="primary"
              />
            }
            label="Use Mock Data"
          />
          
          <Button 
            variant="contained" 
            onClick={fetchTokenData}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Data'}
          </Button>
        </Box>
      </Box>
      
      <MarketProgress tokenConfig={tokenConfig} tokenData={tokenData} />
      
      <Grid container spacing={3}>
        {/* Left character */}
        <Grid item xs={12} md={3}>
          <Character 
            tokenConfig={tokenConfig}
            tokenId={tokenConfig.species1.id}
            health={healthScores[tokenConfig.species1.id]}
            currentMove={currentMoves[tokenConfig.species1.id]}
          />
          <MetricsDisplay 
            tokenConfig={tokenConfig}
            tokenId={tokenConfig.species1.id}
            metrics={tokenData[tokenConfig.species1.id]}
          />
        </Grid>
        
        {/* Battle log and actions */}
        <Grid item xs={12} md={6}>
          <BattleLog logs={battleLogs} />
          <MarketActions 
            tokenConfig={tokenConfig}
            onAction={handleMarketAction}
          />
        </Grid>
        
        {/* Right character */}
        <Grid item xs={12} md={3}>
          <Character 
            tokenConfig={tokenConfig}
            tokenId={tokenConfig.species2.id}
            health={healthScores[tokenConfig.species2.id]}
            currentMove={currentMoves[tokenConfig.species2.id]}
          />
          <MetricsDisplay 
            tokenConfig={tokenConfig}
            tokenId={tokenConfig.species2.id}
            metrics={tokenData[tokenConfig.species2.id]}
          />
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>Move Reference</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="monarch.main">Punches (Price Change)</Typography>
            <Typography variant="body2">P1: +1-3% | P2: +4-6% | P3: +7-9%</Typography>
            <Typography variant="body2">P4: +10% | P5: +20%</Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="sloth.main">Kicks (Volume)</Typography>
            <Typography variant="body2">K1: &lt;$10K | K2: $10-25K | K3: $25-50K</Typography>
            <Typography variant="body2">K4: $50-99K | K5: $100K+</Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" color="error.main">Special Moves</Typography>
            <Typography variant="body2">C2: Combo (High Volatility)</Typography>
            <Typography variant="body2">C3: KO Move (Volatility + $500K Cap + Volume)</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Battle;