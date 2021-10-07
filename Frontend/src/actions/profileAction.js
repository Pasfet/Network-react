import {
  CLEAR_UID,
  CLEAR_USER,
  EDIT_PROFILE,
  SET_UID,
  SET_USER,
} from '../store/types/profileTypes';
import { CURRENT_URL } from '../store/types/authTypes';
import { loadingTrue, loadingFalse } from '../actions/spinnerAction';
import { setError, clearError } from '../actions/errorAction';

export const profileEdit = () => ({
  type: EDIT_PROFILE,
});

export const clearUid = () => ({
  type: CLEAR_UID,
});

export const setUid = uid => ({
  type: SET_UID,
  payload: uid,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const getUser = uid => dispatch => {
  dispatch(clearError());
  dispatch(loadingTrue());
  fetch(`${CURRENT_URL}/profile/${uid}`)
    .then(response => response.json())
    .then(data => {
      if (data.result === 0) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setError(data.text));
      }
    })
    .catch(err => dispatch(setError(err.message)))
    .finally(() => dispatch(loadingFalse()));
};
