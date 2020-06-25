import { ITodo } from '@/types';
import moment from 'moment';

export interface ClassifyTodos {
  today: ITodo[];
  upcoming: ITodo[];
}

export default function classifyTodos(
  todos: ITodo[] | ClassifyTodos,
  newTodo?: ITodo,
): ClassifyTodos | Error {
  let result: ClassifyTodos = {
    today: [] as ITodo[],
    upcoming: [] as ITodo[],
  };
  const classifyTodosError = new Error();
  classifyTodosError.name = 'ClassifyTodosError';

  if ((todos as ClassifyTodos).today) {
    result = todos as ClassifyTodos;
    if (!newTodo) {
      classifyTodosError.message =
        'Type of parameter todos is ClassifyTodos and the parameter newTodo must be provided in ITodo type!';
      return classifyTodosError;
    } else {
      if (
        (moment(newTodo.due).get('date') === moment().get('date') ||
          !newTodo.due) &&
        !newTodo.completed
      ) {
        result.today.push(newTodo);
      } else if (
        moment(moment(newTodo.due).get('date')).isAfter(moment().get('date')) &&
        !newTodo.completed
      ) {
        result.upcoming.push(newTodo);
      }
    }
  } else if (todos instanceof Array) {
    (todos as ITodo[]).forEach((todo) => {
      if (
        (moment(todo.due).get('date') === moment().get('date') || !todo.due) &&
        !todo.completed
      ) {
        result.today.push(todo);
      } else if (
        moment(moment(todo.due).get('date')).isAfter(moment().get('date')) &&
        !todo.completed
      ) {
        result.upcoming.push(todo);
      }
    });
  }

  return result;
}
