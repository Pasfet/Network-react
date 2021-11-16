import { RootReducerTypes } from "../index";

export const getAuth = (state: RootReducerTypes): boolean => state.auth.isAuth;
