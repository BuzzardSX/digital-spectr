import { FC } from 'react';
import { useParams } from 'react-router-dom';

const LaunchPage: FC = () => {
	const { key } = useParams();
	return (<div>{key}</div>);
}

export default LaunchPage;
