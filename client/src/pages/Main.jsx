import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SettingsBar } from '../components/SettingsBar.jsx';
import { ToolBar } from '../components/ToolBar.jsx';
import { Canvas } from '../components/Canvas.jsx';
import { Footer } from '../components/Footer.jsx';
import { ModalGreeting } from '../components/ModalGreeting.jsx';
import { ModalWarning } from '../components/ModalWarning.jsx';
import { useResizeCanvas } from '../hooks/useResizeCanvas.js';
import { setSocket, setSessionId } from '../store/userReducer.js';
import { drawHandler } from '../services/draw_handler.js';

const Main = (props) => {
	const dispatch = useDispatch();
	const params = useParams();
	const username = useSelector((state) => {
		return state.userReducer.username;
	});
	const sessionId = useSelector((state) => {
		return state.userReducer.sessionId;
	});
	const canvas = useSelector((state) => {
		return state.canvasReducer.canvas;
	});
	const [showModalWarning, setShowModalWarning] = React.useState(false);
	const [showModalGreeting, setShowModalGreeting] = React.useState(true);

	// Set up connection with the server through websockets.
	React.useEffect(() => {
		const socket = new WebSocket(`ws://${process.env.HOST_SERVER || '127.0.0.1'}:${process.env.PORT_SERVER || 5000}/`);
		dispatch(setSocket(socket));
		dispatch(setSessionId(params.id));
		// Initialize connection.
		socket.onopen = () => {
			if (!username) {
				return;
			} else {
				socket.send(
					JSON.stringify({
						type: 'connection',
						username: username,
						id: sessionId,
					})
				);
			}
		};
		// Listen for messages from the server.
		socket.onmessage = (event) => {
			const msg = JSON.parse(event.data);
			switch (msg.type) {
				case 'connection':
					console.log(`User: ${msg.username} was connected to the server. ID: ${msg.id}.`);
					break;
				case 'draw':
					// This draw objects handler function is defined in draw_handler.js
					drawHandler(msg, canvas);
					break;
				default:
					break;
			}
		};
	}, [username]);

	return (
		<div className="container">
			<div className="row">
				<h1>Painter Online</h1>
				<ToolBar />
				<SettingsBar setShowModalWarning={setShowModalWarning} />
			</div>
			<div className="row">
				<ModalGreeting showModal={showModalGreeting} setShowModal={setShowModalGreeting} />
				<ModalWarning showModal={showModalWarning} setShowModal={setShowModalWarning} />
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
