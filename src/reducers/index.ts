export interface Action {
  type: string;
  payload: any;
}

export interface State {
  userReducer: any;
  todoReducer: any;
}

export { default as userReducer } from "./userReducer";
export { default as todoReducer } from "./todoReducer";
