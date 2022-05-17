import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import launchesReducer from './features/launches';
import userReducer from './features/user';

const store = configureStore({
	reducer: {
		launches: launchesReducer,
		user: userReducer
	}
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;

export default store;
