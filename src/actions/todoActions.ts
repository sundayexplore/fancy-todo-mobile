import axios from "axios";
import { decideAPI } from "@/utils/config";

interface TodoData {
  name: string;
  dueDate: Date;
}

export const todoAPI = axios.create({
  baseURL: decideAPI("todos")
});

export const addTodo = (todoData: TodoData) => {
  return {
    type: "ADD_TODO",
    payload: {
      todoData
    }
  };
}

export const updateTodo = (todoData: TodoData) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      todoData
    }
  };
}

export const deleteTodo = (todoData: TodoData) => {
  return {
    type: "DELETE_TODO",
    payload: {
      todoData
    }
  };
}
