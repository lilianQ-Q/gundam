import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import Router from './routes/Router';

function App() {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Router />
			
		</BrowserRouter>
	);
}

export default App;
