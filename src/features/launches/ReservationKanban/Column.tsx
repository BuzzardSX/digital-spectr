import { FC } from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import Item from './Item';
import { LaunchCardDragType } from '../types';
import { Launch } from '../types';

interface Props {
	title: string;
	draggableCards: boolean;
	launches: Array<Launch>;
	stackDropRef?: ConnectDropTarget;
	cardDragType?: LaunchCardDragType;
	pending: boolean;
}

const Column: FC<Props> = ({ title, draggableCards, launches, stackDropRef, cardDragType, pending }) => {
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
						return (<Item key={launch.key} draggable={draggableCards} launch={launch} dragType={cardDragType} pending={pending} />);
					})}
				</Stack>
			</Box>
		</>
	);
}

export default Column;
