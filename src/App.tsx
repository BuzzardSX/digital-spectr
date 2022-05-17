import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import store from './store';
import HomePage from './pages/HomePage';
import LaunchPage from './pages/LaunchPage';

const App: FC = () => {
	return (
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<BrowserRouter>
					<Container>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/launch/:key" element={<LaunchPage />} />
						</Routes>
					</Container>
				</BrowserRouter>
			</DndProvider>
		</Provider>
	);
};

export default App;
