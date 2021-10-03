import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import dialogsPage from './DialogsReducer/Dialogs';
import profilePage from './ProfileReducer/Profile';
import animeReducer from './AnimeReducer/AnimeReducer';
import spinnerReducer from './SpinnerReducer/spinnerReducer';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['animePage', 'searchTitle'],
};

const rootReducer = combineReducers({
  profilePage,
  dialogsPage,
  animePage: animeReducer,
  spinner: spinnerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);
