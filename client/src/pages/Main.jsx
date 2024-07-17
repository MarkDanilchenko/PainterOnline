import React from 'react';
import { SettingsBar } from '../components/SettingsBar.jsx';
import { ToolBar } from '../components/ToolBar.jsx';
import { Canvas } from '../components/Canvas.jsx';
import { Footer } from '../components/Footer.jsx';
import { ModalGreeting } from '../components/ModalGreeting.jsx';
import { useResizeCanvas } from '../hooks/useResizeCanvas.js';


const Main = (props) => {
	return (
		<div className="container">
			<div className="row">
				<h1>Painter Online</h1>
				<ToolBar />
				<SettingsBar />
			</div>
			<div className="row">
                <ModalGreeting />
				{/* Custom hook to resize the canvas based on the window size. */}
				<Canvas width={useResizeCanvas().canvasWidth} height={useResizeCanvas().canvasHeight} />
			</div>
			<div className="row">
				<Footer />
			</div>
		</div>
	);
};

export { Main };
