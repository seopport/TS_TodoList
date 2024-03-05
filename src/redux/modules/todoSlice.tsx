import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {},
    completeTodo: (state, action) => {},
    deleteTodo: (state, action) => {},
  },
});

export default todoSlice.reducer;
export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
