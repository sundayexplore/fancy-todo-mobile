export interface Action {
  type: string;
  payload: any;
}

export { default as userReducer } from "./userReducer";
