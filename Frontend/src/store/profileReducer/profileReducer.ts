import { ProfileActions, ProfileActionsTypes, ProfileStateTypes } from "../../types/profileTypes";

const initialState: ProfileStateTypes = {
  uid: { uid: null, name: null, avatar: null },
  myFriends: null,
  user: null,
  posts: [],
};

const profileReducer = (state = initialState, { type, payload } : ProfileActions) : ProfileStateTypes => {
  switch (type) {
    case ProfileActionsTypes.SET_UID:
      return {
        ...state,
        uid: payload,
      };
    case ProfileActionsTypes.CLEAR_UID:
      return {
        ...state,
        uid: { uid: null, name: null, avatar: null},
      };
    case ProfileActionsTypes.SET_USER:
      return {
        ...state,
        user: payload,
      };
    case ProfileActionsTypes.CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    case ProfileActionsTypes.SET_MY_FRIENDS:
      return {
        ...state,
        myFriends: payload,
      };
    case ProfileActionsTypes.CLEAR_MY_FRIENDS:
      return {
        ...state,
        myFriends: null,
      };
    case ProfileActionsTypes.SET_USER_POSTS:
      return {
        ...state,
        posts: payload,
      };
    case ProfileActionsTypes.CLEAR_USER_POSTS:
      return {
        ...state,
        posts: [],
      };
    default:
      return state;
  }
};

export default profileReducer;
