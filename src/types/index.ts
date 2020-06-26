/**
 *
 * Model Interfaces
 *
 */

export interface ITodo {
  _id: string | any;
  name: string;
  due: string | Date | null;
  dueDate?: string | null;
  dueTime?: string | null;
  priority: number;
  position: number | null;
  completed: boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export interface ISignIn {
  [key: string]: string;
  userIdentifier: string;
  password: string;
}

export interface ISignUp extends IUser {
  password: string;
}

export interface ISignInValidation {
  [key: string]: string | any;
  userIdentifier: string | any;
  password?: string | any;
}

export interface ISignUpValidation {
  [key: string]: string | any;
  firstName: string | any;
  username: string | any;
  email: string | any;
  password: string | any;
}

export interface IOAuthUser {
  fullName: string;
  email: string;
}

/**
 *
 * Redux State Interfaces
 *
 */

export interface IRootState {
  user: IUserReducer;
  todo: ITodoReducer;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IUserReducer {
  currentUser: IUser;
  apiKey: string;
  tokens: ITokens;
}

export interface ITokens {
  act: string;
  rft: string;
  _csrf?: string;
}

export interface ITodoReducer {
  today: ITodo[];
  upcoming: ITodo[];
}

/**
 * React Navigation Native Custom Types and Interfaces
 */

export type RootStackParamList = {
  Home: {
    currentUser: IUser;
  };
  SignUp: undefined;
  SignIn: undefined;
};

export type TodoDrawerParamList = {
  Today: undefined;
};

/**
 * Utility Types and Interfaces
 */
