import { rest } from 'msw';

const handlers = [
	rest.put('/user/addReservedLaunch', (req, res) => res()),
	rest.delete('/user/removeReservedLaunch', (req, res) => res())
];

export default handlers;
