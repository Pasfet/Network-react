import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import profileReducer from './profileReducer/profileReducer';
import dialogsReducer from './dialogsReducer/dialogsReducer';
import spinnerReducer from './SpinnerReducer/spinnerReducer';
import authReducer from './auth/authReducer';
import errorReducer from './errorReducer/errorReducer';
import navbarReducer from './navbarReducer/navbarReducer';
import usersReducer from './usersReducer/usersReducer';
import newsReducer from './newsReducer/newsReducer';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  spinner: spinnerReducer,
  auth: authReducer,
  error: errorReducer,
  navbar: navbarReducer,
  usersPage: usersReducer,
  newsPage: newsReducer,
});

export type RootReducerTypes = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'social',
  storage: storage,
  blacklist: ['searchTitle', 'spinner', 'navbar', 'dialogsPage', 'usersPage', 'newsPage'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);
