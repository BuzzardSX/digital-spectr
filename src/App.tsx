import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LaunchPage from './pages/Launch';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/launch/:key" element={<LaunchPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
