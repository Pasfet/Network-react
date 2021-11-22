import { IsEmptyChatsTypes, IsEmptyMessagesTypes, MessageItemTypes, SearchChatsItemTypes } from "../../types/dialogsTypes";
import { RootReducerTypes } from "../index";

export const getChats = (state : RootReducerTypes) : Object => state.dialogsPage.chats;
export const getIsEmptyChats = (state : RootReducerTypes) : IsEmptyChatsTypes | null => state.dialogsPage.isEmptyChats;
export const getSearchChats = (state : RootReducerTypes) : Array<SearchChatsItemTypes> | [] => state.dialogsPage.searchChats;
export const getMessagesFromStore = (state : RootReducerTypes) : Array<MessageItemTypes> => state.dialogsPage.messages;
export const getIsEmptyMessagesState = (state : RootReducerTypes) : IsEmptyMessagesTypes | null => state.dialogsPage.isEmptyMessages;
