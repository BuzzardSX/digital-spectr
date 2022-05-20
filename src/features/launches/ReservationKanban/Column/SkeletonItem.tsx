import { FC } from 'react';
import { Card, CardContent, CardActionArea, Skeleton, Typography } from '@mui/material';

const SkeletonItem: FC = () => {
	return (
		<Card variant="outlined">
			<CardActionArea>
				<CardContent>
					<Typography variant="h5">
						<Skeleton variant="text" />
					</Typography>
					<Typography variant="subtitle1">
						<Skeleton variant="text" />
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

export default SkeletonItem;
