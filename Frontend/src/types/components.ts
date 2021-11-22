import { INavbarItem } from "./navbarTypes";
import {ChangeEvent} from 'react';
import { FriendsItemTypes, MyFriendsTypes, PostItemTypes, UserTypes } from "./profileTypes";
import { ErrorTypes } from "./errorTypes";
import {MessageItemTypes} from './dialogsTypes';

// Navbar Component
export interface INavbarComponentProps {
  auth?: boolean 
  authenticated?: boolean
  uid?: string | null
  logOut?: () => void
  userName?: string | null
  navbarList?: Array<INavbarItem>
}

// AppBarContainer
export interface IAppBarContainerProps {
  open: boolean,
  userName: string,
  auth: boolean | undefined,
  setOpen: (open: boolean) => void,
}

// LogIn component
export interface ILogInProps {
  emailValue: string
  passwordValue: string
  error: string | null
  onSubmitHandler: (e: ChangeEvent<HTMLFormElement>) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
}

// SignUp component
export interface ISignUpProps {
  nameValue: string
  emailValue: string
  passwordValue: string
  repeatPasswordValue: string
  error: string | boolean | null  
  onSubmitHandler: (e: ChangeEvent<HTMLFormElement>) => void
  setNameValue: (value: string) => void
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setRepeatPassword: (value: string) => void
}

// UsersList component 
export interface IUsersListProps {
  myUid: string | null
  myFriends: MyFriendsTypes | null
  users: Array<FriendsItemTypes>
  usersListLength: number | null
  page: number
  perPage: number
  lastPage: number | null
  addToFriendsList: (uid: string) => void
  setPage: (page: number) => void
  setPerPage: (page: number) => void
  submitHandler: (e: ChangeEvent<HTMLFormElement>) => void
  setSearchValue: (value: string) => void
}

// SearchInput component
export interface ISearchInputProps {
  placeholder: string
  changeHandler: (value: string) => void
  onSubmit: (e: ChangeEvent<HTMLFormElement>) => void
}

// PaginationComponent
export interface IPaginationProps {
  length: number | null
  lastPage: number | null
  changePageHandler: (page: number) => void
  currentPage: number
}

// UsersListTable
export interface IUsersListTableProps {
  myUid?: string | null,
  myFriends?: MyFriendsTypes | null,
  users: Array<FriendsItemTypes> | undefined,
  isFriend?: boolean,
  isFriendsOfFriends?: boolean,
  deleteFriend?: (uid: string) => void,
  confirmRequestToFriendsList?: (uid: string) => void,
  rejectFriendRequestHandler?: (uid: string) => void,
  addToFriendsList?: (uid: string) => void
}

// UsersListItem
export interface IUsersListItemProps {
  myUid?: string | null
  myFriends?: MyFriendsTypes | null
  user: FriendsItemTypes
  isFriendsOfFriends?: boolean
  isFriend?: boolean
  deleteFriend: (uid: string) => void
  confirmRequestToFriendsList: (uid: string) => void
  rejectFriendRequestHandler: (uid: string) => void
  addToFriendsList: (uid: string) => void 
}

// UserFriendsList component
export interface IUserFriendsList {
  user: UserTypes | null
  addToFriendsList: (uid: string) => void
}

// ProfileEditTable component
export interface IProfileEditTableProps {
  birthday: string
  city: string
  site: string
  language: string
  error: string | null
  setBirthday: (value: string) => void
  setCity: (value: string) => void
  setSite: (value: string) => void
  setLanguage: (value: string) => void
  sendAbout: () => void
}

// Profile component
export interface IProfileProps {
  user: UserTypes | null
  myFriends: MyFriendsTypes | null
  uid: string
  myUid: string | null
  error: ErrorTypes | null
  openStatus: boolean
  statusInput: string | undefined
  userPosts: Array<PostItemTypes>
  postValue: string
  openDialog: boolean
  formAvatar: any
  fileInfo: any
  setOpenStatus: (open: boolean) => void
  setStatusInput: (value: string) => void
  sendStatus: () => void
  addToFriendsList: () => void
  deleteFriend: () => void
  rejectFriendRequestHandler: () => void
  setPostValue: (value: string) => void
  addPost: (e: any) => void
  deletePost: (postId: any) => void
  setOpenDialog: (open: boolean) => void
  sendAvatar: (e: any) => void
  setFileInfo: (file: null | Object) => void
}

// DialogSendImage component
export interface IDialogSendImageProps {
  open: boolean
  title?: string
  text?: string
  formAvatar: any
  fileInfo: any
  handleClose: (close: boolean) => void
  sendAvatar: (e: any) => void
  setFileInfo: (file: null | Object) => void
}

// ProfilePageActions component
export interface IProfilePageActionsProps {
  myUid: string | null
  uid: string | null
  myFriends: MyFriendsTypes | null
  addToFriendsList: () => void
  deleteFriend: () => void
  rejectFriendRequestHandler: () => void
  setOpenDialog: (open: boolean) => void
}

// FriendsBlock component
export interface IFriendsBlockProps {
  userFriends: Array<FriendsItemTypes> | undefined
  uid: string | null
}

// ProfileAboutUser component
export interface IProfileAboutUserProps {
  about: any
}

// ProfilePosts component
export interface IProfilePostsProps {
  userPosts: Array<PostItemTypes>
  error: string
  postValue: string
  myUid: string | null
  uid: string
  setPostValue: (value: string) => void
  addPost: (e: any) => void
  deletePost: (postId: any) => void
}

// Post component
export interface IPostsProps {
  post: PostItemTypes
  myUid: string | null
  uid: string
  deletePost: (postId: any) => void
}

// MessageBar component
export interface IMessageBarProps {
  chats: any
  chatId: string
}

// MessagesList component
export interface IMessageListProps {
  messages: Array<MessageItemTypes>
  inputValue: string
  uid: string
  error: string | null
  isEmpty: boolean
  setInputValue: (value: string) => void
  sendMessage: (e: ChangeEvent<HTMLFormElement>) => void
}

// Message component
export interface IMessageProps {
  message: MessageItemTypes
  uid: string
}

// MessageAdd component
export interface IMessageAddProps {
  inputValue: string
  setInputValue: (value: string) => void
  sendMessage: (e: ChangeEvent<HTMLFormElement>) => void
}

// MyFriendsList component
export interface IMMyFriendsListProps {
  myFriends: MyFriendsTypes,
  tabsValue: string,
  setTabsValue: (e: ChangeEvent<any>) => void,
  confirmRequestToFriendsList: () => void,
  rejectFriendRequestHandler: () => void,
  deleteFriend: () => void,
  error: string | null,
}

// CardItem component
interface NewsPostItem {
  image: string,
  title: string,
  description: string,
  source: string,
  url: string,
  published_at: string
}

export interface ICardItemProps {
  post: NewsPostItem
}

// NewsList component
export interface INewsListProps {
  news: Array<NewsPostItem>,
  fetchMoreNews: () => void
}