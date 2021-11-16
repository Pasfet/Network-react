import { ErrorTypes, SnackMessageTypes } from "../../types/errorTypes";
import { RootReducerTypes } from "../index";

export const getError = (state : RootReducerTypes) : ErrorTypes | null => state.error.error;
export const getSnackMessage = (state : RootReducerTypes) : SnackMessageTypes | null => state.error.snackMessage;
