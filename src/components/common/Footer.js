import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: 'rgba(10, 10, 15, 0.7)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 229, 255, 0.1)',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
        
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
