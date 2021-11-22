import { INavbarItem } from "../../types/navbarTypes";
import { RootReducerTypes } from "../index";

export const getNavbarList = (state : RootReducerTypes) : Array<INavbarItem> => state.navbar.navbarList;
