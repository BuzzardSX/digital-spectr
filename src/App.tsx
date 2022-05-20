import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { Container } from '@mui/material';
import HomePage from './pages/Home';
import LaunchPage from './pages/Launch';
import store from './store';

const App: FC = () => {
	return (
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<Container>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route path="/launch/:key" element={<LaunchPage />} />
						</Routes>
					</BrowserRouter>
				</Container>
			</DndProvider>
		</Provider>
	);
}

export default App;
