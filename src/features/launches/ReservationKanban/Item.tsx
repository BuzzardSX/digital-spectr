import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardActionArea, CardContent, Typography, Skeleton } from '@mui/material';
import { LaunchCardDragType } from '../types';
import { Launch } from '../types';

interface Props {
	draggable: boolean;
	dragType?: LaunchCardDragType;
	launch: Launch;
	pending: boolean;
}

const Item: FC<Props> = ({ draggable, launch, dragType, pending }) => {
	let dragRef = null;

	if (draggable) {
		const [, ref] = useDrag(() => ({
			type: dragType,
			item: {
				launchKey: launch.key
			},
		}));

		dragRef = ref;
	}

	return (
		<>
			<Card variant="outlined" ref={dragRef}>
				<CardActionArea>
					<CardContent>
						<Typography variant="h5">{launch.name}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}

export default Item;
