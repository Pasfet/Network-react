import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import dialogsPage from './DialogsReducer/Dialogs';
import profilePage from './ProfileReducer/Profile';

const modulesStore = combineReducers({
  profilePage,
  dialogsPage,
});

export const store = createStore(modulesStore, composeWithDevTools());
