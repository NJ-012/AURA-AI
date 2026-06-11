import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#6366F1', // Indigo Accent
      light: '#818CF8',
      dark: '#4F46E5',
    },
    secondary: {
      main: '#EC4899', // Pink highlights for empathetic focus
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#0F172A',
            secondary: '#475569',
          },
          divider: '#E2E8F0',
        }
      : {
          background: {
            default: '#020617',
            paper: '#0B0F19',
          },
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
          },
          divider: '#1E293B',
        }),
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: '0.025em',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: mode === 'light' 
            ? '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
          border: `1px solid ${mode === 'light' ? '#E2E8F0' : '#1E293B'}`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));