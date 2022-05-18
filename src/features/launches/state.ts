import { Launch } from './types';

export const initialState: State = {
	past: {
		values: [],
		isLoading: true
	},
	upcoming: {
		values: [],
		isLoading: true
	}
};

interface Past {
	values: Launch[];
	isLoading: boolean;
}

interface Upcoming {
	values: Launch[];
	isLoading: boolean;
}

interface State {
	past: Past;
	upcoming: Upcoming;
}
