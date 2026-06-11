import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { createAppTheme } from './theme';
import AuraFeed from './components/AuraFeed';

// Setting deep immersive mode to highlight elite UI elements
const darkTheme = createAppTheme('dark');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Global CSS override to ensure NO horizontal scrollbar can ever exist */}
      <GlobalStyles 
        styles={{ 
          body: { 
            overflowX: 'hidden', 
            margin: 0, 
            padding: 0,
            width: '100vw'
          },
          html: {
            overflowX: 'hidden'
          }
        }} 
      />
      <AuraFeed />
    </ThemeProvider>
  </React.StrictMode>
);