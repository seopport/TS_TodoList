import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../../components/TodoPage';

type SliceState = {
  todos: Todo[];
};

const initialState: SliceState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setStoreTodo: (state, action) => {
      //payload: todo 배열
      return { ...state, todos: action.payload };
    },
    addStoreTodo: (state, action: PayloadAction<Todo>): SliceState => {
      // payload: todo 객체 하나
      return { ...state, todos: [...state.todos, action.payload] };
    },
    updateStoreTodo: (state, action: PayloadAction<string>) => {
      //payload: todo 아이디
      const newTodos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else return item;
      });
      return { ...state, todos: newTodos };
    },
    deleteStoreTodo: (state, action: PayloadAction<string>) => {
      // payload: todo 아이디
      const newTodos = state.todos.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, todos: newTodos };
    },
  },
});

export default todoSlice.reducer;
export const { setStoreTodo, addStoreTodo, updateStoreTodo, deleteStoreTodo } = todoSlice.actions;
