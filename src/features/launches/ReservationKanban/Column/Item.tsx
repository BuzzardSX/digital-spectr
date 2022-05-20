import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { LaunchCardDragType } from '../../types';
import { Launch } from '../../types';

interface Props {
	draggable: boolean;
	dragType?: LaunchCardDragType;
	launch: Launch;
}

const Item: FC<Props> = ({ draggable, launch, dragType }) => {
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
		<Card variant="outlined" ref={dragRef}>
			<CardActionArea>
				<CardContent>
					<Typography variant="h6">{launch.name}</Typography>
					<Typography variant="subtitle1">{new Date(launch.startTime).toDateString()}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default Item;
