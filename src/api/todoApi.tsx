import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Todo } from '../components/TodoPage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_TODOS_URL,
});

const getTodos = async () => {
  const response = await instance.get('');
  return response.data;
};

const addTodo = async (newTodo: Todo) => {
  await instance.post('', newTodo);
};

const updateTodo = async ({ id, newTodo }: { id: string; newTodo: object }) => {
  await instance.patch(`/${id}`, newTodo);
};

const deleteTodo = async (id: string) => {
  await instance.delete(`/${id}`);
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // 응답을 받았을 시 수행할 작업
    return response;
  },
  (error) => {
    if (error.response) {
      // 에러 처리
    } else {
      // 요청이 전송되지 않은 경우 또는 응답을 받지 못한 경우
    }
    return Promise.reject(error);
  }
);

export { instance, getTodos, addTodo, deleteTodo, updateTodo };
