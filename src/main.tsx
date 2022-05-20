import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { worker } from './mocks/browser';

const app = (
	<Provider store={store}>
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	</Provider>
);

worker.start();

createRoot(document.getElementById('App')).render(app);
