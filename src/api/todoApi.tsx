import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_TODOS_URL,
});

type Todo = {
  id: string;
  title: string;
  memo: string;
  isDone: boolean;
};

const getTodos = async <T,>(): Promise<T> => {
  const response = await instance.get('');
  return response.data;
};

const addTodo = async (newTodo: Todo) => {
  await instance.post('', newTodo);
};

const deleteTodo = async (todoId: string) => {
  await instance.delete(`/${todoId}`);
};

export { instance, getTodos, addTodo, deleteTodo };
