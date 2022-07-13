import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './stores/reduxStore';
import { SnackbarProvider } from 'notistack';


const store = reduxStore;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={1} preventDuplicate autoHideDuration={3000} anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}>
      <App />
    </SnackbarProvider>
  </Provider>
);