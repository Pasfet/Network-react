import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import profileReducer from './profileReducer/profileReducer';
import dialogsReducer from './dialogsReducer/dialogsReducer';
import animeReducer from './animeReducer/animeReducer';
import spinnerReducer from './SpinnerReducer/spinnerReducer';
import authReducer from './auth/authReducer';
import errorReducer from './errorReducer/errorReducer';
import navbarReducer from './navbarReducer/navbarReducer';

const persistConfig = {
  key: 'social',
  storage: storage,
  blacklist: ['animePage', 'searchTitle', 'spinner', 'navbar', 'dialogsPage'],
};

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  animePage: animeReducer,
  spinner: spinnerReducer,
  auth: authReducer,
  error: errorReducer,
  navbar: navbarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);
