import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  ChainsContext,
  ChainsContextDefaultValue,
} from '../context/chains.context';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    common: {
      black: '#252829',
    },
    background: {
      default: '#1C1E1F',
      paper: '#30363B',
    },
    text: {
      secondary: '#969DA3',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ChainsContext.Provider value={ChainsContextDefaultValue}>
        <Component {...pageProps} />
      </ChainsContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
