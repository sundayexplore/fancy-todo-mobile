/**
 *
 * Model Interfaces
 *
 */

export interface ITodo {
  _id: string | any;
  name: string;
  due: string | Date;
  dueDate: string;
  dueTime: string;
  priority: number;
  position: number;
  completed: boolean;
}

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
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
  users: IUser;
  todos: ITodo[]
}

export interface IAction {
  type: string;
  payload: any;
}
