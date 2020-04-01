import { Action } from ".";

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  token: null
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload.user,
        token: action.payload.token
      };

    case "SIGN_OUT":
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        token: null
      };

    default:
      return state;
  }
};
