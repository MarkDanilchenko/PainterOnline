import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTool, setStrokeColor } from "../store/toolsReducer.js";
import { Brush, Rectangle, Circle, Eraser, Line } from "../services/tools_handler.js";
import { ModalNotice } from "./ModalNotice.jsx";

const ToolBar = (props) => {
	const dispatch = useDispatch();
	const canvas = useSelector((state) => {
		return state.canvasReducer.canvas;
	});
	const undoList = useSelector((state) => {
		return state.canvasReducer.undoList;
	});
	const redoList = useSelector((state) => {
		return state.canvasReducer.redoList;
	});
	const selectedTool = useSelector((state) => {
		return state.toolsReducer.tool;
	});
	const socket = useSelector((state) => {
		return state.userReducer.socket;
	});
	const sessionId = useSelector((state) => {
		return state.userReducer.sessionId;
	});
	const [showModal, setShowModal] = React.useState(false);
	const [modalContent, setModalContent] = React.useState("");
	const [modalResult, setModalResult] = React.useState(false);
	React.useEffect(() => {
		if (modalResult) {
			socket.send(
				JSON.stringify({
					type: "clear",
					id: sessionId,
				})
			);
		}
		setModalResult(false);
	}, [modalResult]);

	const undoAction = () => {
		socket.send(
			JSON.stringify({
				type: "undo",
				id: sessionId,
				undoList: undoList,
			})
		);
	};

	const redoAction = () => {
		socket.send(
			JSON.stringify({
				type: "redo",
				id: sessionId,
				redoList: redoList,
			})
		);
	};

	const clear = () => {
		setModalContent(
			"Are you sure you want to clear the canvas? This action cannot be undone and will completely clear the canvas for all currently connected users!"
		);
		setShowModal(true);
	};

	const save = () => {
		const data = canvas.toDataURL();
		const a = document.createElement("a");
		a.style = "display: none";
		a.href = data;
		a.download = `canvas-${sessionId}.png`;
		a.click();
		a.remove();
	};

	return (
		<>
			<ModalNotice showModal={showModal} modalContent={modalContent} setShowModal={setShowModal} setModalResult={setModalResult} />
			<div className="toolBar">
				{/* left buttons */}
				<div>
					<button
						className={`toolBar__button_brush ${selectedTool instanceof Brush ? "active" : ""}`}
						onClick={() => {
							dispatch(setTool(new Brush(canvas, socket, sessionId)));
							// this dispatch is needed if we want to use brush with selected color after eraser. Otherwise color will be white (like eraser).
							dispatch(setStrokeColor(document.getElementById("settingsBar__input_colorPicker-stroke").value));
						}}
					></button>
					<button
						className={`toolBar__button_rectangle ${selectedTool instanceof Rectangle ? "active" : ""}`}
						onClick={() => dispatch(setTool(new Rectangle(canvas, socket, sessionId)))}
					></button>
					<button
						className={`toolBar__button_circle ${selectedTool instanceof Circle ? "active" : ""}`}
						onClick={() => dispatch(setTool(new Circle(canvas, socket, sessionId)))}
					></button>
					<button
						className={`toolBar__button_eraser ${selectedTool instanceof Eraser ? "active" : ""}`}
						onClick={() => dispatch(setTool(new Eraser(canvas, socket, sessionId)))}
					></button>
					<button
						className={`toolBar__button_line ${selectedTool instanceof Line ? "active" : ""}`}
						onClick={() => {
							dispatch(setTool(new Line(canvas, socket, sessionId)));
							// this dispatch is needed if we want to use line with selected color after eraser. Otherwise color will be white (like eraser).
							dispatch(setStrokeColor(document.getElementById("settingsBar__input_colorPicker-stroke").value));
						}}
					></button>
				</div>
				{/* right buttons */}
				<div>
					<button className="toolBar__button_undo" onClick={() => undoAction()}></button>
					<button className="toolBar__button_redo" onClick={() => redoAction()}></button>
					<button className="toolBar__button_save" onClick={() => save()}></button>
					<button className="toolBar__button_clear" onClick={() => clear()}></button>
				</div>
			</div>
		</>
	);
};

export { ToolBar };
