import { createSlice, createAction } from '@reduxjs/toolkit';

interface State {
	reservedLaunches: string[];
}

const initialState: State = {
	reservedLaunches: []
};

export const addReservedLaunch = createAction<string>('add_reserved_launch');

export const removeReservedLaunch = createAction<string>('remove_reserved_launch');

const { reducer } = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => builder
		.addCase(addReservedLaunch, (state, action) => ({
			...state,
			reservedLaunches: [...state.reservedLaunches, action.payload]
		}))
		.addCase(removeReservedLaunch, (state, action) => ({
			...state,
			reservedLaunches: state.reservedLaunches.filter(launch => launch != action.payload)
		}))
});

export default reducer;
