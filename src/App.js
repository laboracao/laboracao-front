import react, {useEffect, useState} from 'react';
import { Router } from 'react-router-dom';
import GlobalStyle from './styles/global';

import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { useSelector } from 'react-redux';

import {COLORS} from './styles/colors';

import AllRoutes from './routes';
import history from './services/history';

import DefaultContext from './stores/defaultContext';

import {LoadingComponent} from './services/api';

const theme = createTheme({
  palette: {
    success: {
      main : "#bac778",
    },
    primary: {
      main: COLORS.primary,
    },
    secondary: {
      main: COLORS.dark1,
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
      dark: "rgb(152, 39, 45)",
      light: "rgb(225, 96, 103)"
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

function App() {

  const [defaultContext, setDefaultContext] = useState({});

  const loading = useSelector(state => state.load);

  return (
    <DefaultContext.Provider value={defaultContext}>
      <LoadingComponent {...{loading}} />
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <AllRoutes />
            <GlobalStyle />
          </Router>
        </ThemeProvider>
    </DefaultContext.Provider>
    
  );
}

export default App;
