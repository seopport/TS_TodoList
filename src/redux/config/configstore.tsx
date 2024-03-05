import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import todoSlice from '../modules/todoSlice';

const store = configureStore({
  reducer: {
    todoSlice,
  },
});

// Redux 스토어의 디스패치 메서드의 타입을 AppDispatch로 정의한다.
// 이를 사용하면 애플리케이션의 다른 부분에서 Redux 스토어의 디스패치 메서드를 사용할 때 타입을 명시적으로 지정할 수 있다.
export type AppDispatch = typeof store.dispatch;

//Redux 스토어의 상태(root state)의 타입을 나타내는 타입
//Redux 스토어의 상태의 타입을 RootState로 정의한다.
export type RootState = ReturnType<typeof store.getState>;

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
