import React from 'react';
import { Box } from '@mui/material';

const PageContainer = ({ backgroundImage, children, overlay = true }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - 160px)',
        padding: '24px 0',
        position: 'relative',
      }}
    >
      {overlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(10, 10, 15, 0.6)',
            zIndex: -1,
          }}
        />
      )}
      {children}
    </Box>
  );
};

export default PageContainer;