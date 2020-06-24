import { IAction, IUserReducer, IUser } from '@/types';

const initialState: IUserReducer = {
  currentUser: {} as IUser,
  apiKey: '',
  tokens: {
    act: '',
    rft: '',
  },
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload.user,
        token: action.payload.token,
      };

    case 'SIGN_OUT':
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        token: null,
      };

    default:
      return state;
  }
};
