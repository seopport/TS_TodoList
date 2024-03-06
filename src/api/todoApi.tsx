import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Todo } from '../components/TodoPage';
import notification from '../util/notification';

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

const updateTodo = async ({ id, newTodo }: { id: string; newTodo: Partial<Todo> }) => {
  await instance.patch(`/${id}`, newTodo);
};

const deleteTodo = async (id: string) => {
  await instance.delete(`/${id}`);
};

// 요청 인터셉터
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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
      if (error.response.status === 404) {
        notification('404 Not Found', 'error');
      } else if (error.response.status === 400) {
        notification('400 Bad Request', 'error');
      }
    } else {
      notification('알 수 없는 오류가 발생했습니다.', 'error');
      // 요청이 전송되지 않은 경우 또는 응답을 받지 못한 경우
    }
    return Promise.reject(error);
  }
);

export { instance, getTodos, addTodo, deleteTodo, updateTodo };
