import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoSlice from '../modules/todoSlice';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  todoSlice,
});
// storage에 저장하기 위해 아래와 같이 persistConfig를 생성해야 한다.
const persistConfig = {
  //obj의 key를 나타냄
  key: 'root',
  //storage의 타입을 나타냄(여기에선 localstorage)
  storage,
  // todoSlice Reducer만 persist 적용하기 whitelist 외에도 blacklist 등 여러 option이 존재한다.
  whitelist: ['todoSlice'],
};

// enhanced된 reducer를 반환한다.(redux-persist+redux 모듈을 종합하여 persist를 반환)
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Redux 스토어의 디스패치 메서드의 타입을 AppDispatch로 정의한다.
// 이를 사용하면 애플리케이션의 다른 부분에서 Redux 스토어의 디스패치 메서드를 사용할 때 타입을 명시적으로 지정할 수 있다.
export type AppDispatch = typeof store.dispatch;

//Redux 스토어의 상태(root state)의 타입을 나타내는 타입
//Redux 스토어의 상태의 타입을 RootState로 정의한다.
// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
//
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
