import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { LaunchCardDragType, Launch } from '../../types';

interface Props {
	draggable: boolean;
	dragType?: LaunchCardDragType;
	launch: Launch;
}

const LaunchCard: FC<Props> = ({ draggable, launch, dragType }) => {
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
			<CardActionArea component={Link} to={`/launch/${launch.key}`} target="_blank">
				<CardContent>
					<Typography variant="h5">{launch.name}</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default LaunchCard;
