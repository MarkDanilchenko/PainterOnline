import React from 'react';
import { SettingsBar } from './components/SettingsBar.jsx';
import { ToolBar } from './components/ToolBar.jsx';
import { Canvas } from './components/Canvas.jsx';

const App = (props) => {
	return (
		<div className="app">
			<div className="container">
				<SettingsBar />
				<ToolBar />
				<Canvas />
			</div>
		</div>
	);
};

export { App };
