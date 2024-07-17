import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router.jsx';

const App = (props) => {
	return (
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	);
};

export { App };
