import { FC } from 'react';
import { Stack, Card, CardContent, CardActionArea, Skeleton, Typography } from '@mui/material';

const perPage = 10;

const SkeletonStack: FC = () => {
	const item = (
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

	return (
		<Stack spacing={1}>
			{[...Array(perPage)].map(() => item)}
		</Stack>
	);
}

export default SkeletonStack;
