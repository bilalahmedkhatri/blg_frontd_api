import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors'

import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@mui/icons-material';

interface ColorModeSelectProps {
  sx?: SxProps<Theme>; // Add sx prop for styling
}

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

const ColorModeContext = React.createContext<ColorModeContextProps>({
  toggleColorMode: () => { }, // Default empty function
});

export const useColorMode = () => React.useContext(ColorModeContext);

interface Props {
  children: React.ReactNode;
}

export const ColorModeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  // Persist mode in localStorage
  useEffect(() => {
    const storedMode = localStorage.getItem('colorMode') as 'light' | 'dark' | null;
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // Customize your light and dark palettes here:
          ...(mode === 'light'
            ? {
              // Light mode palette
              primary: {
                main: '#1976d2',
              },
              background: {
                default: '#fff',
                paper: '#f5f5f5',
              },
              text: {
                primary: '#212121',
                secondary: '#757575',
              },
            }
            : {
              // Dark mode palette
              primary: {
                main: '#90caf9',
              },
              background: {
                default: blueGrey[900],
                paper: '#424242',
              },
              text: {
                primary: '#fff',
                secondary: '#ccc',
              },
              // boxShadow:
            // 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
            }),
        },
        // You can also customize typography, components, etc. in the theme
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const ColorModeSelect: React.FC<ColorModeSelectProps> = ({ sx }) => {
  const theme = useTheme();
  const colorMode = useColorMode();

  return (
    <IconButton
    edge="end"
      sx={sx}
      onClick={colorMode.toggleColorMode}
      color="inherit"
    >
      {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ColorModeSelect;