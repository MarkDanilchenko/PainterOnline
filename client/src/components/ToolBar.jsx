import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setStrokeColor } from '../store/toolsReducer.js';
import { undo, redo, clearCanvas } from '../store/canvasReducer.js';
import { Brush, Rectangle, Circle, Eraser, Line } from '../services/tools_handler.js';

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

	const undoAction = () => {
		if (undoList.length > 0) {
			const lastCanvasState = undoList[undoList.length - 1];
			const img = new Image();
			img.src = lastCanvasState;
			img.onload = () => {
				dispatch(undo(img));
			};
		} else {
			console.warn(`Nothing to undo. Please, draw something first.`);
		}
	};

	const redoAction = () => {
		if (redoList.length > 0) {
			const nextCanvasState = redoList[redoList.length - 1];
			const img = new Image();
			img.src = nextCanvasState;
			img.onload = () => {
				dispatch(redo(img));
			};
		} else {
			console.warn(`Nothing to redo.`);
		}
	};

	const clear = () => {
		dispatch(clearCanvas());
	};

	return (
		<div className="toolBar">
			{/* left buttons */}
			<div>
				<button
					className={`toolBar__button_brush ${selectedTool instanceof Brush ? 'active' : ''}`}
					onClick={() => {
						dispatch(setTool(new Brush(canvas, socket, sessionId)));
						// this dispatch is needed if we want to use brush with selected color after eraser. Otherwise color will be white (like eraser).
						dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
					}}
				></button>
				<button
					className={`toolBar__button_rectangle ${selectedTool instanceof Rectangle ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Rectangle(canvas, socket, sessionId)))}
				></button>
				<button
					className={`toolBar__button_circle ${selectedTool instanceof Circle ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Circle(canvas, socket, sessionId)))}
				></button>
				<button
					className={`toolBar__button_eraser ${selectedTool instanceof Eraser ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Eraser(canvas, socket, sessionId)))}
				></button>
				<button
					className={`toolBar__button_line ${selectedTool instanceof Line ? 'active' : ''}`}
					onClick={() => {
						dispatch(setTool(new Line(canvas, socket, sessionId)));
						// this dispatch is needed if we want to use line with selected color after eraser. Otherwise color will be white (like eraser).
						dispatch(setStrokeColor(document.getElementById('settingsBar__input_colorPicker-stroke').value));
					}}
				></button>
			</div>
			{/* right buttons */}
			<div>
				<button className="toolBar__button_undo" onClick={() => undoAction()}></button>
				<button className="toolBar__button_redo" onClick={() => redoAction()}></button>
				<button className="toolBar__button_save"></button>
				<button className="toolBar__button_clear" onClick={() => clear()}></button>
			</div>
		</div>
	);
};

export { ToolBar };
