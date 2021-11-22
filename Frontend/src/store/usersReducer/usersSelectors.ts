import { UserItemTypes } from "../../types/usersPageTypes";
import { RootReducerTypes } from "../index";

export const getUsersListFromStore = (state : RootReducerTypes) : Array<UserItemTypes> => state.usersPage.users;
export const getUsersListLength = (state : RootReducerTypes) : number | null => state.usersPage.usersListLength;
export const getUsersListLastPage = (state : RootReducerTypes) : number | null => state.usersPage.lastPage;
