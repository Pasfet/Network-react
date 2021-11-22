export interface INavbarItem {
  name: string
  href: string
  requiredAuth: boolean
  dynamic: boolean
  icon: string
  public?: boolean
}

export interface INavbarActionsType {
  type: any,
  payload: any
}

export interface NavbarStateTypes {
  navbarList: Array<INavbarItem>
}