import { FC, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Column from './Column';
import { Grid, Snackbar, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

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
			drop: async ({ launchKey }) => {
				await dispatch(addReservedLaunch(launchKey));
				setSnackbarOpen(true);
			}
		}));

		return (<Column title="My launches &#128640;" draggableCards launches={launches} stackDropRef={stackDropRef} cardDragType={'reserved_launch_card'} />);
	}

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const snackbarAction = (
		<IconButton color="inherit" onClick={handleSnackbarClose}>
			<CloseIcon />
		</IconButton>
	);

	return (
		<>
			<Typography variant="h2" align="center" sx={{ my: 3 }}>Explore the space &#128125;</Typography>
			<Grid container columns={3} spacing={3}>
				<Grid item md={1}>
					<Column title="Past launches &#127756;" draggableCards={false} launches={pastLaunches} pending={isPastLaunchesLoading} />
				</Grid>
				<Grid item md={1}>{renderUpcomingLaunches()}</Grid>
				<Grid item md={1}>{renderReservedLaunches()}</Grid>
			</Grid>
			<Snackbar open={snackbarOpen} message="Successfully added" autoHideDuration={3000} action={snackbarAction} onClose={handleSnackbarClose} />
		</>
	);
}

export default ReservationKanban;
