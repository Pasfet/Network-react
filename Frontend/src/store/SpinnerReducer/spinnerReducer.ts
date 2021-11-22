import { SpinnerActions, SpinnerActionsTypes, SpinnerStateTypes } from "../../types/spinnerTypes";

const initialState: SpinnerStateTypes = {
  loading: true,
};

const spinnerReducer = (state = initialState, { type, payload } : SpinnerActions) : SpinnerStateTypes => {
  switch (type) {
    case SpinnerActionsTypes.LOADING_TRUE:
      return {
        ...state,
        loading: true,
      };

    case SpinnerActionsTypes.LOADING_FALSE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default spinnerReducer;
