import axios from "axios";
import { decideAPI } from '../utils/config';

export const todoAPI = axios.create({
  baseURL: decideAPI('todos')
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
