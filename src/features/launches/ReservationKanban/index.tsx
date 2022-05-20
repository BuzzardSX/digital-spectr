import { FC, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Column from './Column';
import { Container, Grid, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../store';
import { loadPast, loadUpcoming } from '../index';
import { addReservedLaunch, removeReservedLaunch } from '../../user';

interface StackDropItem {
	launchKey: string;
}

interface StackDropCollect {
	isStackDropActive: boolean;
}

const ReservationKanban: FC = () => {
	const dispatch = useAppDispatch();

	const pastLaunches = useAppSelector(state => state.launches.past.values);

	const isPastLaunchesLoading = useAppSelector(state => state.launches.past.pending);

	useEffect(() => {
		dispatch(loadPast());
		dispatch(loadUpcoming());
	}, []);

	const renderUpcomingLaunches = () => {
		const isLoading = useAppSelector(state => state.launches.past.pending);

		const launches = useAppSelector(state => {
			return state.launches.upcoming.values.filter(launch => {
				return state.user.reservedLaunches.indexOf(launch.key) == -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'reserved_launch_card',
			drop: ({ launchKey }) => {
				dispatch(removeReservedLaunch(launchKey));
			}
		}));

		return (<Column title="Launches &#128760;" draggableCards launches={launches} stackDropRef={stackDropRef} cardDragType={'upcoming_launch_card'} pending={isLoading} />);
	}

	const renderReservedLaunches = () => {
		const launches = useAppSelector(state => {
			return state.launches.upcoming.values.filter(launch => {
				return state.user.reservedLaunches.indexOf(launch.key) != -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'upcoming_launch_card',
			drop: ({ launchKey }) => {
				dispatch(addReservedLaunch(launchKey))
			}
		}));

		return (<Column title="My launches &#128640;" draggableCards launches={launches} stackDropRef={stackDropRef} cardDragType={'reserved_launch_card'} />);
	}

	return (
		<Container>
			<Typography variant="h2" align="center" sx={{ my: 3 }}>Explore the space &#128125;</Typography>
			<Grid container columns={3} spacing={3}>
				<Grid item md={1}>
					<Column title="Past launches &#127756;" draggableCards={false} launches={pastLaunches} pending={isPastLaunchesLoading} />
				</Grid>
				<Grid item md={1}>{renderUpcomingLaunches()}</Grid>
				<Grid item md={1}>{renderReservedLaunches()}</Grid>
			</Grid>
		</Container>
	);
}

export default ReservationKanban;
