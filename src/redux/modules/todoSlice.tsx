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
      // console.log(action.payload);
      //페이로드: 투두 배열
      return { ...state, todos: action.payload };
    },
    addStoreTodo: (state, action: PayloadAction<Todo>): void => {
      // 페이로드: 투두 객체 하나
      state.todos?.push(action.payload);
    },
    updateStoreTodo: (state, action: PayloadAction<string>) => {
      console.log('first');
      //페이로드: 아이디
      const newTodos = state.todos.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else return item;
      });
      return { ...state, todos: newTodos };
    },
    deleteTodo: (state, action) => {},
  },
});

export default todoSlice.reducer;
export const { setStoreTodo, addStoreTodo, updateStoreTodo, deleteTodo } = todoSlice.actions;
