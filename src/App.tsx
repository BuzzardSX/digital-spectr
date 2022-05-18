import { FC, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import LaunchesColumn from './LaunchesColumn';
import { Container, Grid, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from './store';
import { loadPast, loadUpcoming } from './features/launches';
import { addReservedLaunch, removeReservedLaunch } from './features/user';

interface StackDropItem {
	launchKey: string;
}

interface StackDropCollect {
	isStackDropActive: boolean;
}

const HomePage: FC = () => {
	const dispatch = useAppDispatch();

	const pastLaunches = useAppSelector(state => state.launches.past.values);

	const isPastLaunchesLoading = useAppSelector(state => state.launches.past.isLoading);

	useEffect(() => {
		dispatch(loadPast());
		dispatch(loadUpcoming());
	}, []);

	const renderUpcomingLaunches = () => {
		const isLoading = useAppSelector(state => state.launches.past.isLoading);

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

		return (<LaunchesColumn title="Launches" draggableCards={true} launches={launches} stackDropRef={stackDropRef} cardDragType={'upcoming_launch_card'} isLoading={isLoading} />);
	}

	const renderReservedLaunches = () => {
		// const isLoading = useAppSelector(state => state.launches.past.isLoading);

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

		return (<LaunchesColumn title="My launches" draggableCards={true} launches={launches} stackDropRef={stackDropRef} cardDragType={'reserved_launch_card'} isLoading={launches.length == 0} />);
	}

	return (
		<Container>
			<Typography variant="h1" align="center" sx={{ my: 3 }}>Explore the space &#128125;</Typography>
			<Grid container columns={3} spacing={2}>
				<Grid item md={1}>
					<LaunchesColumn title="Past launches" draggableCards={false} launches={pastLaunches} isLoading={isPastLaunchesLoading} />
				</Grid>
				<Grid item md={1}>{renderUpcomingLaunches()}</Grid>
				<Grid item md={1}>{renderReservedLaunches()}</Grid>
			</Grid>
		</Container>
	);
}

export default HomePage;
