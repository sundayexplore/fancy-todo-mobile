import axios from "axios";

export const todoAPI = axios.create({
  baseURL: `https://sunday-fancy-todo-api.herokuapp.com/todos`
});

interface TodoData {
  name: string;
  dueDate: Date;
}

export const createTodo = (todoData: TodoData) => ({
  type: "CREATE_TODO",
  payload: {
    todoData
  }
});

export const updateTodo = (todoData: TodoData) => ({
  type: "UPDATE_TODO",
  payload: {
    todoData
  }
});

export const deleteTodo = (todoData: TodoData) => ({
  type: "DELETE_TODO",
  payload: {
    todoData
  }
});
