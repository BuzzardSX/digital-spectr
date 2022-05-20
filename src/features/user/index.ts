import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { initialState } from './state';

export const addReservedLaunch = createAsyncThunk<string, string>('add_reserved_launch', async (key) => {
	const body = JSON.stringify({ key });

	const resp = await fetch('/user/addReservedLaunch', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body
	});

	return key;
});

export const removeReservedLaunch = createAsyncThunk<string, string>('remove_reserved_launch', async (key) => {
	const body = JSON.stringify({ key });

	const resp = await fetch('/user/removeReservedLaunch', {
		method: 'DELETE',
		body
	});

	return key;
});

export const setReservedLaunchesPickedKey = createAction<string>('set_reserved_launches_picked_key');

// export const setReservedLaunchesPickedKey = createAsyncThunk<string, string>('set_reserved_launches_picked_key', (key) => {
// 	return key;
// });

const { reducer } = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addReservedLaunch.fulfilled, (state, { payload }) => ({
			...state,
			reservedLaunches: {
				...state.reservedLaunches,
				keys: [
					...state.reservedLaunches.keys,
					payload
				],
				pickedKey: payload
			}
		}));
		builder.addCase(removeReservedLaunch.fulfilled, (state, { payload }) => ({
			...state,
			reservedLaunches: {
				...state.reservedLaunches,
				keys: state.reservedLaunches.keys.filter(launch => launch != payload)
			}
		}));
		builder.addCase(setReservedLaunchesPickedKey, (state, { payload }) => ({
			...state,
			reservedLaunches: {
				...state.reservedLaunches,
				pickedKey: payload
			}
		}));
	}
});

export default reducer;
