import {
  CLEAR_MY_FRIENDS,
  CLEAR_UID,
  CLEAR_USER,
  CLEAR_USER_POSTS,
  SET_MY_FRIENDS,
  SET_UID,
  SET_USER,
  SET_USER_POSTS,
} from '../store/types/profileTypes';
import { CURRENT_URL } from '../store/types/authTypes';
import { loadingTrue, loadingFalse } from './spinnerActions';
import { setError, setSnack } from './errorActions';
import { profileChangeFetchHelper, profilePageActionsHelper } from './actionHelper';

export const clearUid = () => ({
  type: CLEAR_UID,
});

export const setUid = user => ({
  type: SET_UID,
  payload: user,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});

export const setMyFriends = freinds => ({
  type: SET_MY_FRIENDS,
  payload: freinds,
});

export const clearMyFriends = () => ({
  type: CLEAR_MY_FRIENDS,
});

export const setUserPosts = posts => ({
  type: SET_USER_POSTS,
  payload: posts,
});

export const clearUserPosts = () => ({
  type: CLEAR_USER_POSTS,
});

// REQUESTS
export const getUserProfileFromApi = uid => {
  return async dispatch => {
    dispatch(loadingTrue());
    try {
      const response = await fetch(`${CURRENT_URL}/profile/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setUser(data.user));
        dispatch(loadingFalse());
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(loadingFalse());
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const sendProfileChange = (uid, change) => {
  return async dispatch => {
    try {
      const data = await profileChangeFetchHelper('PATCH', 'profile', uid, change);
      if (data.result === 0) {
        dispatch(getUserProfileFromApi(uid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'send-profile-change' }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const getMyFriendsList = uid => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/friends/${uid}`);
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setMyFriends(data.friends));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'get-friends-list' }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const sendRequestToFriendList = (senderUid, recipientUid) => {
  return dispatch => {
    return profilePageActionsHelper('PATCH', { senderUid, recipientUid }, 'add-friends', dispatch);
  };
};

export const rejectFriendRequest = (senderUid, recipientUid) => {
  return async dispatch => {
    return profilePageActionsHelper(
      'DELETE',
      { senderUid, recipientUid },
      'reject-friend-request',
      dispatch,
    );
  };
};

export const deleteFriendFromFriendsList = (senderUid, recipientUid) => {
  return async dispatch => {
    return profilePageActionsHelper('PUT', { senderUid, recipientUid }, 'delete-friend', dispatch);
  };
};

export const addToFriendsList = (senderUid, recipientUid) => {
  return async dispatch => {
    return profilePageActionsHelper('POST', { senderUid, recipientUid }, 'add-friend', dispatch);
  };
};

export const getUserPosts = uid => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/posts?uid=${uid}`);
      const data = await response.json();

      if (data.result === 0) {
        dispatch(setUserPosts(data.posts));
      } else {
        dispatch(clearUserPosts());
        dispatch(setError({ message: data.text, type: 'user-posts' }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const sendUserPost = (uid, post) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/posts?uid=${uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ post }),
      });

      const data = await response.json();

      if (data.result === 0) {
        dispatch(getUserPosts(uid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'user-posts' }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const deleteUserPost = (uid, postId) => {
  return async dispatch => {
    try {
      const response = await fetch(`${CURRENT_URL}/posts?uid=${uid}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ postId }),
      });

      const data = await response.json();

      if (data.result === 0) {
        dispatch(getUserPosts(uid));
        dispatch(setSnack({ text: data.text, result: data.result }));
      } else {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(setError({ message: data.text, type: 'user-posts' }));
      }
    } catch (err) {
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};
