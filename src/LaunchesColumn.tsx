import { FC } from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import LaunchCard from './LaunchCard';
import { LaunchCardDragType, Launch } from './types';

interface Props {
	title: string;
	draggableCards: boolean;
	launches: Array<Launch>;
	stackDropRef?: ConnectDropTarget;
	cardDragType?: LaunchCardDragType;
}

const LaunchesColumn: FC<Props> = ({ title, draggableCards, launches, stackDropRef, cardDragType }) => {
	const boxStyle: SxProps = {
		border: 1,
		borderColor: 'grey.300',
		borderRadius: 1,
		p: 1,
		height: '100%'
	};

	return (
		<>
			<Typography variant="h3" align="center" sx={{ py: 2 }}>{title}</Typography>
			<Box sx={boxStyle}>
				<Stack ref={stackDropRef} spacing={1} sx={{ height: '100%' }}>
					{launches?.map(launch => {
						return (<LaunchCard key={launch.key} draggable={draggableCards} launch={launch} dragType={cardDragType} />);
					})}
				</Stack>
			</Box>
		</>
	);
}

export default LaunchesColumn;
