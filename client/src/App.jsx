import React from 'react';
import { SettingsBar } from './components/SettingsBar.jsx';
import { ToolBar } from './components/ToolBar.jsx';
import { Canvas } from './components/Canvas.jsx';

const App = (props) => {
	return (
		<div className="app">
			<div className="container">
                <h1>Painter Online</h1>
				<ToolBar />
				<SettingsBar />
				<Canvas width={600} height={600} />
			</div>
		</div>
	);
};

export { App };
