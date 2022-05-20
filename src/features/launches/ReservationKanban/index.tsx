import { FC, useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Column from './Column';
import { Grid, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../../../store';
import { loadPast, loadUpcoming } from '../index';
import { addReservedLaunch, removeReservedLaunch, setReservedLaunchesPickedKey } from '../../user';

interface StackDropItem {
	launchKey: string;
}

interface StackDropCollect {
	isStackDropActive: boolean;
}

const ReservationKanban: FC = () => {
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const [dialogOpen, setDialogOpen] = useState(false);

	const dispatch = useAppDispatch();

	const pastLaunches = useAppSelector(state => state.launches.past.values);

	const pickedReservedLaunch = useAppSelector(state => {
		const launch = state.launches.upcoming.values.find(v => {
			return v.key == state.user.reservedLaunches.pickedKey;
		});
		return launch!;
	});

	const lastReservedLaunch = useAppSelector(state => {
		const length = state.user.reservedLaunches.keys.length;
		const key = state.user.reservedLaunches.keys[length - 1];
		const launch = state.launches.upcoming.values.find(value => value.key == key);
		return launch!;
	});

	const isPastLaunchesPending = useAppSelector(state => state.launches.past.pending);

	useEffect(() => {
		dispatch(loadPast());
		dispatch(loadUpcoming());
	}, []);

	const renderUpcomingLaunches = () => {
		const isPending = useAppSelector(state => state.launches.past.pending);

		const launches = useAppSelector(state => {
			return state.launches.upcoming.values.filter(launch => {
				return state.user.reservedLaunches.keys.indexOf(launch.key) == -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'reserved_launch_card',
			drop: ({ launchKey }) => {
				dispatch(setReservedLaunchesPickedKey(launchKey));
				setDialogOpen(true);
			}
		}));

		return (
			<Column
				title="Launches &#128760;"
				draggableCards launches={launches}
				stackDropRef={stackDropRef}
				cardDragType={'upcoming_launch_card'}
				pending={isPending}
			/>
		);
	}

	const renderReservedLaunches = () => {
		const launches = useAppSelector(state => {
			return state.launches.upcoming.values.filter(launch => {
				return state.user.reservedLaunches.keys.indexOf(launch.key) != -1;
			});
		});

		const [, stackDropRef] = useDrop<StackDropItem, unknown, StackDropCollect>(() => ({
			accept: 'upcoming_launch_card',
			drop: async ({ launchKey }) => {
				await dispatch(addReservedLaunch(launchKey));
				setSnackbarOpen(true);
			}
		}));

		return (
			<Column
				title="My launches &#128640;"
				draggableCards
				launches={launches}
				stackDropRef={stackDropRef}
				cardDragType={'reserved_launch_card'}
			/>
		);
	}

	const snackbarMessage = `${lastReservedLaunch?.name} successfully added`;

	const handleSnackbarClose = () => {
		setSnackbarOpen(false);
	};

	const snackbarAction = (
		<IconButton color="inherit" onClick={handleSnackbarClose}>
			<CloseIcon />
		</IconButton>
	);

	const handleYes = async () => {
		await dispatch(removeReservedLaunch(pickedReservedLaunch.key));
		setDialogOpen(false);
	};

	return (
		<>
			<Typography variant="h2" align="center" sx={{ my: 3 }}>Explore the space &#128125;</Typography>
			<Grid container columns={3} spacing={3}>
				<Grid item md={1}>
					<Column
						title="Past launches &#127756;"
						draggableCards={false}
						launches={pastLaunches}
						pending={isPastLaunchesPending}
					/>
				</Grid>
				<Grid item md={1}>{renderUpcomingLaunches()}</Grid>
				<Grid item md={1}>{renderReservedLaunches()}</Grid>
			</Grid>
			<Snackbar
				open={snackbarOpen}
				message={snackbarMessage}
				autoHideDuration={4000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				action={snackbarAction}
				onClose={handleSnackbarClose}
			/>
			<Dialog open={dialogOpen}>
				<DialogTitle>Confirm cancellation</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure want to cancel reservation?
					</DialogContentText>
					<DialogActions>
						<Button onClick={handleYes}>Yes</Button>
						<Button onClick={() => setDialogOpen(false)}>No</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default ReservationKanban;
