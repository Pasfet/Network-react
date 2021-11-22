import { AuthActions, AuthActionsTypes, AuthStateTypes } from "../../types/authTypes";

const initialState:AuthStateTypes = {
  isAuth: false
};

const authReducer = (state = initialState, { type } : AuthActions) : AuthStateTypes => {
  switch (type) {
    case AuthActionsTypes.SET_AUTH:
      return {
        ...state,
        isAuth: true,
      };

    case AuthActionsTypes.CLEAR_AUTH:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default authReducer;
