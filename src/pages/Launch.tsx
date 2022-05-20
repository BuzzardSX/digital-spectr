import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Box, Typography } from '@mui/material';

interface Launch {
	name: string;
	startTime: string;
}

const LaunchPage: FC = () => {
	const { key } = useParams();

	const [launch, setLaunch] = useState<Launch>({
		name: '',
		startTime: ''
	});

	const loadLaunch = async (key: string) => {
		const resp = await fetch(`https://api.spacexdata.com/v4/launches/${key}`);
		const json = await resp.json();
		console.log(json);

		setLaunch(state => ({
			...state,
			name: json.name,
			startTime: json.date_local
		}));
	};

	useEffect(() => {
		loadLaunch(key!);
	}, []);

	return (
		<Box sx={{ py: 4 }}>
			<Typography variant="h1" align="center">&#128640;</Typography>
			<Typography variant="h1" align="center">{launch.name}</Typography>
			<Typography variant="h4" align="center" sx={{ py: 3 }}>Launch time: {new Date(launch.startTime).toDateString()}</Typography>
		</Box>
	);
};

export default LaunchPage;
