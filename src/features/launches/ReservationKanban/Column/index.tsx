import { FC } from 'react';
import { ConnectDropTarget } from 'react-dnd';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import Item from './Item';
import SkeletonItem from './SkeletonItem';
import { LaunchCardDragType } from '../../types';
import { Launch } from '../../types';

interface Props {
	title: string;
	draggableCards: boolean;
	launches: Array<Launch>;
	stackDropRef?: ConnectDropTarget;
	cardDragType?: LaunchCardDragType;
	pending?: boolean;
}

const Column: FC<Props> = ({ title, draggableCards, launches, stackDropRef, cardDragType, pending = false }) => {
	const boxStyle: SxProps = {
		border: 1,
		borderColor: 'grey.300',
		borderRadius: 1,
		p: 2,
		height: '100%'
	};

	const items = launches?.map(launch => {
		return (<Item key={launch.key} draggable={draggableCards} launch={launch} dragType={cardDragType} />);
	});

	const skeletonItems = [...Array(10)].map((item, index) => <SkeletonItem key={index} />);

	return (
		<>
			<Typography variant="h4" align="center" sx={{ py: 2 }}>{title}</Typography>
			<Box sx={boxStyle}>
				<Stack ref={stackDropRef} spacing={2} sx={{ height: '100%' }}>
					{pending ? skeletonItems : items}
				</Stack>
			</Box>
		</>
	);
}

export default Column;
