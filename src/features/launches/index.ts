import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from './state';
import { Launch } from './types';

export const loadPast = createAsyncThunk<Launch[]>('load_past', async () => {
	const resp = await fetch('https://api.spacexdata.com/v3/launches/past?order=desc&limit=20');
	const json = await resp.json();

	const launches = json.map(item => ({
		key: item.flight_number,
		name: item.mission_name,
		startTime: item.launch_date_local
	}));

	return launches;
});

export const loadUpcoming = createAsyncThunk<Launch[]>('load_upcoming', async () => {
	const resp = await fetch('https://api.spacexdata.com/v4/launches/upcoming');
	const json = await resp.json();

	const launches = json.map(item => ({
		key: item.id,
		name: item.name,
		startTime: item.date_local
	}));

	return launches;
});

const { reducer } = createSlice({
	name: 'launches',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadPast.fulfilled, (state, action) => ({
			...state,
			past: {
				...state.past,
				values: action.payload,
				pending: false
			}
		}));
		builder.addCase(loadUpcoming.fulfilled, (state, action) => ({
			...state,
			upcoming: {
				...state.upcoming,
				values: action.payload,
				pending: false
			}
		}));
	}
});

export default reducer;
