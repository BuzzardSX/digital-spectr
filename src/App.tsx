import { FC } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { Container, CssBaseline, AppBar, Toolbar, Link } from '@mui/material';
import HomePage from './pages/Home';
import LaunchPage from './pages/Launch';
import store from './store';

const App: FC = () => {
	return (
		<Provider store={store}>
			<DndProvider backend={HTML5Backend}>
				<BrowserRouter>
					<CssBaseline />
					<AppBar position="sticky">
						<Container>
							<Toolbar>
								<Link component={RouterLink} to="/" sx={{ color: "white" }}>Home</Link>
							</Toolbar>
						</Container>
					</AppBar>
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
