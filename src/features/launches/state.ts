import { Launch } from './types';

export const initialState: State = {
	past: {
		values: [],
		pending: true
	},
	upcoming: {
		values: [],
		pending: true
	}
};

interface Past {
	values: Launch[];
	pending: boolean;
}

interface Upcoming {
	values: Launch[];
	pending: boolean;
}

interface State {
	past: Past;
	upcoming: Upcoming;
}
