import { IAction, ITodoReducer, ITodo } from '@/types';
import { classifyTodos } from '@/utils';

const initialState: ITodoReducer = {
  today: [] as ITodo[],
  upcoming: [] as ITodo[],
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        ...classifyTodos(state, action.payload.todo),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        ...classifyTodos(state, action.payload.todo),
      };

    case 'DELETE_TODO':
      const todosAfterDeletion: ITodo[] = Object.values(state)
        .flat()
        .filter((todo: ITodo) => todo._id !== action.payload.todo._id);
      return {
        ...state,
        ...classifyTodos(todosAfterDeletion),
      };

    default:
      return state;
  }
};
