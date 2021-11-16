import { MyFriendsTypes, PostItemTypes, UserTypes } from "../../types/profileTypes";
import { RootReducerTypes } from "../index";

export const getMyUid = (state : RootReducerTypes) : string | null => state.profilePage.uid?.uid;
export const getMyName = (state : RootReducerTypes) : string | null => state.profilePage.uid?.name;
export const getMyAvatar = (state : RootReducerTypes) : string | null => state.profilePage.uid?.avatar;
export const getUserProfile = (state : RootReducerTypes) : UserTypes | null => state.profilePage?.user;
export const getMyFriends = (state : RootReducerTypes) : MyFriendsTypes | null => state.profilePage?.myFriends;
export const getUserPostsFromStore = (state : RootReducerTypes) : Array<PostItemTypes> => state.profilePage?.posts;
