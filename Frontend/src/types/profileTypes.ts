export interface UidTypes {
  uid: string | null,
  name: string | null,
  avatar: string | null
}

export interface FriendsItemTypes {
  user_name: string,
  avatar: string | null,
  uid: string,
  incoming?: boolean
}

export interface MyFriendsTypes {
  friends_requisitions: [] | Array<FriendsItemTypes>,
  user_friends: [] | Array<FriendsItemTypes>
}

export interface AboutItemTypes {
  text: string ,
  payload?: string 
}

export interface AboutUserTypes {
  birthday: AboutItemTypes,
  city: AboutItemTypes,
  site: AboutItemTypes,
  language: AboutItemTypes
}

export interface UserTypes {
  uid: string,
  user_name: string,
  avatar: null | string,
  user_friends: Array<FriendsItemTypes>,
  status: string,
  about: AboutUserTypes
}

export interface PostItemTypes {
  id?: string,
  author_name: string | null,
  text: string,
  author_uid: string | null,
  author_avatar?: string | null
}

export interface ProfileStateTypes {
  uid: UidTypes,
  myFriends: MyFriendsTypes | null,
  user: UserTypes | null,
  posts: Array<PostItemTypes> | []
}

export enum ProfileActionsTypes {
  SET_UID = 'SET_UID',
  CLEAR_UID = 'CLEAR_UID',
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  SET_MY_FRIENDS = 'SET_MY_FRIENDS',
  CLEAR_MY_FRIENDS = 'CLEAR_MY_FRIENDS',
  SET_USER_POSTS = 'SET_USER_POSTS',
  CLEAR_USER_POSTS = 'CLEAR_USER_POSTS',
}

interface SetUid {
  type: ProfileActionsTypes.SET_UID,
  payload: UidTypes
}
interface ClearUid {
  type: ProfileActionsTypes.CLEAR_UID,
  payload: any
}
interface SetUser {
  type: ProfileActionsTypes.SET_USER,
  payload: UserTypes
}
interface ClearUser {
  type: ProfileActionsTypes.CLEAR_USER,
  payload: any
}
interface SetMyFriends {
  type: ProfileActionsTypes.SET_MY_FRIENDS,
  payload: MyFriendsTypes
}
interface ClearMyFriends {
  type: ProfileActionsTypes.CLEAR_MY_FRIENDS,
  payload: any
}
interface SetUserPosts {
  type: ProfileActionsTypes.SET_USER_POSTS,
  payload: Array<PostItemTypes>
}
interface ClearUserPosts {
  type: ProfileActionsTypes.CLEAR_USER_POSTS,
  payload: any
}

export type ProfileActions = SetUid | ClearUid | SetUser | ClearUser | SetMyFriends | ClearMyFriends | SetUserPosts | ClearUserPosts;