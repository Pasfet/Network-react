import { RootReducerTypes } from "../index";

type NavbarItemTypes = {
  name: string
  href: string
  requiredAuth: boolean
  dynamic: boolean
  icon: string
  public?: boolean
}

export const getNavbarList = (state : RootReducerTypes) : Array<NavbarItemTypes> => state.navbar.navbarList;
