import { EDIT_PROFILE } from '../types/profileTypes';

const initialState = {
  profileEdit: false,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case EDIT_PROFILE:
      return {
        ...state,
        profileEdit: !state.profileEdit,
      };
    default:
      return state;
  }
};

export default profileReducer;
