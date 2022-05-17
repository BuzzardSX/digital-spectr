import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import LaunchesColumn from './LaunchesColumn';
import { Grid, Typography } from '@mui/material';
import { useAppDispatch, RootState } from '../../store';
import { loadPast, loadUpcoming } from '../../features/launches';
import { addReservedLaunch, removeReservedLaunch } from '../../features/user';

interface StackDropItem {
	launchKey: string;
}

interface StackDropCollect {
	isStackDropActive: boolean;
}

const HomePage: FC = () => {
	const dispatch = useAppDispatch();

	const pastLaunches = useSelector((state: RootState) => state.launches.past);

	useEffect(() => {
		dispatch(loadPast());
		dispatch(loadUpcoming());
	}, []);

	const renderUpcomingLaunches = () => {
		const launches = useSelector((state: RootState) => {
			return state.launches.upcoming.filter(launch => {
				return state.user.reservedLaunches.indexOf(launch.key) == -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'reserved_launch_card',
			drop: ({ launchKey }) => {
				dispatch(removeReservedLaunch(launchKey));
			}
		}));

		return (<LaunchesColumn title="Launches" draggableCards={true} launches={launches} stackDropRef={stackDropRef} cardDragType={'upcoming_launch_card'} />);
	}

	const renderReservedLaunches = () => {
		const launches = useSelector((state: RootState) => {
			return state.launches.upcoming.filter(launch => {
				return state.user.reservedLaunches.indexOf(launch.key) != -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'upcoming_launch_card',
			drop: ({ launchKey }) => {
				dispatch(addReservedLaunch(launchKey))
			}
		}));

		return (<LaunchesColumn title="My launches" draggableCards={true} launches={launches} stackDropRef={stackDropRef} cardDragType={'reserved_launch_card'} />);
	}

	return (
		<>
			<Typography variant="h1" align="center" sx={{ my: 3 }}>Explore the space &#128125;</Typography>
			<Grid container columns={3} spacing={2}>
				<Grid item md={1}>
					<LaunchesColumn title="Past launches" draggableCards={false} launches={pastLaunches} />
				</Grid>
				<Grid item md={1}>{renderUpcomingLaunches()}</Grid>
				<Grid item md={1}>{renderReservedLaunches()}</Grid>
			</Grid>
		</>
	);
}

export default HomePage;
