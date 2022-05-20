export const initialState: State = {
	reservedLaunches: {
		keys: [],
		pickedKey: "init"
	}
};

interface ReservedLaunches {
	keys: string[];
	pickedKey: string;
}

interface State {
	reservedLaunches: ReservedLaunches;
}
