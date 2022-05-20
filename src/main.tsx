import { createRoot } from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser';

worker.start({ quiet: true }).then(() => {
	createRoot(document.getElementById('App')).render(<App />);
});
