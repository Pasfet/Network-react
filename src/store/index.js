import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ProfileReducer from './Profile';

export const store = createStore(ProfileReducer, composeWithDevTools());