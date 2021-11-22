import { RootReducerTypes } from "../index";

export const spinnerState = (state : RootReducerTypes) : boolean => state.spinner.loading;
