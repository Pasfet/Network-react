import {Dispatch} from 'redux';
import { CURRENT_URL } from '../types/authTypes';
import { loadingTrue, loadingFalse } from './spinnerActions';
import { setError, setSnack } from './errorActions';
import { profileChangeFetchHelper, profilePageActionsHelper } from './actionHelper';
import { AboutUserTypes, MyFriendsTypes, PostItemTypes, ProfileActions, ProfileActionsTypes, UidTypes, UserTypes } from '../types/profileTypes';

export const clearUid = (): ProfileActions => ({
  type: ProfileActionsTypes.CLEAR_UID,
  payload: null
});

export const setUid = (user: UidTypes): ProfileActions => ({
  type: ProfileActionsTypes.SET_UID,
  payload: user,
});

export const setUser = (user: UserTypes): ProfileActions => ({
  type: ProfileActionsTypes.SET_USER,
  payload: user,
});

export const clearUser = (): ProfileActions => ({
  type: ProfileActionsTypes.CLEAR_USER,
  payload: null
});

export const setMyFriends = (friends: MyFriendsTypes): ProfileActions => ({
  type: ProfileActionsTypes.SET_MY_FRIENDS,
  payload: friends,
});

export const clearMyFriends = (): ProfileActions => ({
  type: ProfileActionsTypes.CLEAR_MY_FRIENDS,
  payload: null
});

export const setUserPosts = (posts: Array<PostItemTypes>): ProfileActions => ({
  type: ProfileActionsTypes.SET_USER_POSTS,
  payload: posts,
});

export const clearUserPosts = (): ProfileActions => ({
  type: ProfileActionsTypes.CLEAR_USER_POSTS,
  payload: null
});

// REQUESTS
export const getUserProfileFromApi = (uid: string | null) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    } finally {
      dispatch(loadingFalse());
    }
  };
};

export const sendProfileChange = (uid: string| null, change: Object) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const getMyFriendsList = (uid: string | null) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const sendRequestToFriendList = (senderUid: string | null, recipientUid: string | null) => {
  return (dispatch: Dispatch<any>): Promise<void> => {
    return profilePageActionsHelper('PATCH', { senderUid, recipientUid }, 'add-friends', dispatch);
  };
};

export const rejectFriendRequest = (senderUid: string | null, recipientUid: string | null) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    return profilePageActionsHelper(
      'DELETE',
      { senderUid, recipientUid },
      'reject-friend-request',
      dispatch,
    );
  };
};

export const deleteFriendFromFriendsList = (senderUid: string | null, recipientUid: string | null) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    return profilePageActionsHelper('PUT', { senderUid, recipientUid }, 'delete-friend', dispatch);
  };
};

export const addToFriendsList = (senderUid: string, recipientUid: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    return profilePageActionsHelper('POST', { senderUid, recipientUid }, 'add-friend', dispatch);
  };
};

export const getUserPosts = (uid: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const sendUserPost = (uid: string, post: PostItemTypes) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const deleteUserPost = (uid:string, postId: string) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
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
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};

export const setAvatar = (uid: string | null, image: any) => {
  return async (dispatch: Dispatch<any>): Promise<void> => {
    try {
      const response = await fetch(`${CURRENT_URL}/images?uid=${uid}`, {
        method: 'POST',
        body: image,
      });
      const data = await response.json();
      if (data.result === 0) {
        dispatch(setSnack({ text: data.text, result: data.result }));
        dispatch(getUserProfileFromApi(uid));
      }
    } catch (err) {
      //@ts-ignore
      dispatch(setError({ message: err.message, type: 'error' }));
    }
  };
};
