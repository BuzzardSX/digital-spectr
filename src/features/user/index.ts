import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from './state';

export const loadReservedLaunches = createAsyncThunk<string[]>('load_reserved_launches', async () => {
	const resp = await fetch('/user/reservedLaunches');
	const json = resp.json();
	console.log(json);

	return [];
});

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

const { reducer } = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(addReservedLaunch.fulfilled, (state, action) => ({
			...state,
			reservedLaunches: [
				...state.reservedLaunches,
				action.payload
			]
		}));
		builder.addCase(removeReservedLaunch.fulfilled, (state, action) => ({
			...state,
			reservedLaunches: state.reservedLaunches.filter(launch => launch != action.payload)
		}));
	}
});

export default reducer;
