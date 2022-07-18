import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import reduxStore from './stores/reduxStore';
import { SnackbarProvider } from 'notistack';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';


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


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();