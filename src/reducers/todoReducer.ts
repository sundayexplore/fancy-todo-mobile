import { Action } from ".";

const initialState = {
  todos: []
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: state.todos.concat(action.payload.todoData)
      };

    case "UPDATE_TODO":
      const updatedTodos: any = [...state.todos];
      const updatedTodoIndex: number = updatedTodos
        .map((todo: any) => todo._id)
        .indexOf(action.payload.todoData._id);
      updatedTodos[updatedTodoIndex] = action.payload.todoData;
      return {
        ...state,
        todos: [...updatedTodos]
      };

    case "DELETE_TODO":
      const deletedTodos: any = state.todos.filter(
        (todo: any) => todo.id != action.payload.todoData._id
      );
      return {
        ...state,
        todos: [...deletedTodos]
      };

    default:
      return state;
  }
};
