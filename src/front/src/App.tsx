import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import './index.css';
import Router from './routes/Router';

function App() {

	return (
		<BrowserRouter>
			<ScrollToTop />
			<Router />
			<Toaster/>
		</BrowserRouter>
	);
}

export default App;
