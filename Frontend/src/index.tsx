import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/index';
import GlobalStyles from './GlobalStyles';

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
            <GlobalStyles />
            <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('app'),
);
