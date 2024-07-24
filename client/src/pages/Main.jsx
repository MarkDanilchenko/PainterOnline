import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SettingsBar } from "../components/SettingsBar.jsx";
import { ToolBar } from "../components/ToolBar.jsx";
import { Canvas } from "../components/Canvas.jsx";
import { Footer } from "../components/Footer.jsx";
import { ModalGreeting } from "../components/ModalGreeting.jsx";
import { useResizeCanvas } from "../hooks/useResizeCanvas.js";
import { setSocket, setSessionId } from "../store/userReducer.js";
import { clearCanvas, undo, redo, syncUndoList } from "../store/canvasReducer.js";
import { drawHandler } from "../services/draw_handler.js";
import axios from "axios";

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
	const [showModalGreeting, setShowModalGreeting] = React.useState(true);
	// Set up connection with the server through websockets.
	React.useEffect(() => {
		const socket = new WebSocket(`ws://${process.env.HOST_SERVER || "127.0.0.1"}:${process.env.PORT_SERVER || 5000}/`);
		dispatch(setSocket(socket));
		dispatch(setSessionId(params.id));
		socket.onopen = () => {
			if (!username) {
				return;
			} else {
				socket.send(
					JSON.stringify({
						type: "connection",
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
				case "connection":
					console.log(`User: ${msg.username} was connected to the server. ID: ${msg.id}.`);
					msg.undoList && dispatch(syncUndoList(msg.undoList));
					break;
				case "draw":
					drawHandler(msg, canvas);
					break;
				case "clear":
					socket.send(
						JSON.stringify({
							type: "undoListSync",
							id: sessionId,
							lastAction: canvas.toDataURL(),
						})
					);
					dispatch(clearCanvas());
					// Clear canvas Image on the server in mediafiles.
					axios
						.post(
							`http://${process.env.HOST_SERVER || "127.0.0.1"}:${process.env.PORT_SERVER || 5000}/api/v1/image?sessionId=${params.id}`,
							{
								canvasImgData: canvas.toDataURL(),
							},
							{
								headers: {
									"Content-Type": "application/json",
								},
							}
						)
						.catch((e) => {
							console.log(e.message);
						});
					break;
				case "undoListSync":
					dispatch(syncUndoList(msg.undoList));
					break;
				case "undo":
					if (msg.undoList.length > 0) {
						const lastCanvasState = msg.undoList[msg.undoList.length - 1];
						const img = new Image();
						img.src = lastCanvasState;
						img.onload = () => {
							dispatch(undo(img));
						};
					} else {
						console.warn(`Nothing to undo. Please, draw something first.`);
					}
					break;
				case "redo":
					if (msg.redoList.length > 0) {
						const nextCanvasState = msg.redoList[msg.redoList.length - 1];
						const img = new Image();
						img.src = nextCanvasState;
						img.onload = () => {
							dispatch(redo(img));
						};
					} else {
						console.warn(`Nothing to redo. Please, undo something first.`);
					}
					break;
				default:
					break;
			}
		};
	}, [username]);

	return (
		<div className="container">
			<div className="row">
				<div className="col-10 offset-1">
					<h1>Painter Online</h1>
					<ToolBar />
					<SettingsBar />
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<ModalGreeting showModalGreeting={showModalGreeting} setShowModalGreeting={setShowModalGreeting} />
					{/* Custom hook to resize the canvas based on the window size. */}
					<Canvas width={useResizeCanvas().canvasWidth} height={useResizeCanvas().canvasHeight} />
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export { Main };
