import React from 'react';
import { SettingsBar } from './components/SettingsBar.jsx';
import { ToolBar } from './components/ToolBar.jsx';
import { Canvas } from './components/Canvas.jsx';
import { Footer } from './components/Footer.jsx';

const App = (props) => {
	return (
		<div className="container">
			<div className="row">
				<h1>Painter Online</h1>
				<ToolBar />
				<SettingsBar />
			</div>
			<div className="row">
				<Canvas width={600} height={600} />
			</div>
			<div className="row">
				<Footer />
			</div>
		</div>
	);
};

export { App };
