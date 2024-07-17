import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SettingsBar } from '../components/SettingsBar.jsx';
import { ToolBar } from '../components/ToolBar.jsx';
import { Canvas } from '../components/Canvas.jsx';
import { Footer } from '../components/Footer.jsx';
import { ModalGreeting } from '../components/ModalGreeting.jsx';
import { useResizeCanvas } from '../hooks/useResizeCanvas.js';

const Main = (props) => {
	const params = useParams();
	const username = useSelector((state) => {
		return state.userReducer.username;
	});
	// Set up connection with the server through websockets.
	React.useEffect(() => {
		const socket = new WebSocket(`ws://${process.env.HOST_SERVER || '127.0.0.1'}:${process.env.PORT_SERVER || 5000}/`);
		socket.onopen = () => {
			if (!username) {
				return;
			} else {
				socket.send(
					JSON.stringify({
						type: 'connection',
						username: username,
						id: params.id,
					})
				);
			}
		};
		socket.onmessage = (event) => {
			const response = JSON.parse(event.data);
			console.log(`User: ${response.username} was connected to the server. ID: ${response.id}.`);
		};
	}, [username]);

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
