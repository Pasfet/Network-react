import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './assets/index.scss';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('app'),
);
