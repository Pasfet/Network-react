export const getMyUid = state => state.profilePage.uid?.uid;
export const getMyName = state => state.profilePage.uid?.name;
export const getMyAvatar = state => state.profilePage.uid?.avatar;
export const getUserProfile = state => state.profilePage?.user;
export const getMyFriends = state => state.profilePage?.myFriends;
export const getUserPostsFromStore = state => state.profilePage?.posts;
