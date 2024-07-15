import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setFillColor, setStrokeColor } from '../store/toolsReducer.js';
import { Brush, Rectangle, Circle, Eraser, Line } from '../services/tools_handler.js';
import { undo, redo } from '../store/canvasReducer.js';

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

	const setColor = (event) => {
		try {
			dispatch(setFillColor(event.target.value));
			dispatch(setStrokeColor(event.target.value));
		} catch (error) {
			console.warn(`Tool is not set. Please, choose a tool first and then set a color.`);
			alert(`Tool is not set. Please, choose a tool first and then set a color.`);
		}
	};

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

	return (
		<div className="toolBar">
			{/* left buttons */}
			<div>
				<button
					className={`toolBar__button_brush ${selectedTool instanceof Brush ? 'active' : ''}`}
					onClick={() => {
						dispatch(setTool(new Brush(canvas)));
						// this dispatch is needed if we want to use brush with selected color after eraser. Otherwise color will be white (like eraser).
						dispatch(setStrokeColor(document.getElementById('toolBar__button_colorPicker').value));
					}}
				></button>
				<button
					className={`toolBar__button_rectangle ${selectedTool instanceof Rectangle ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Rectangle(canvas)))}
				></button>
				<button
					className={`toolBar__button_circle ${selectedTool instanceof Circle ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Circle(canvas)))}
				></button>
				<button
					className={`toolBar__button_eraser ${selectedTool instanceof Eraser ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Eraser(canvas)))}
				></button>
				<button
					className={`toolBar__button_line ${selectedTool instanceof Line ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Line(canvas)))}
				></button>
				<button
					className="toolBar__button_colorPicker"
					onClick={() => {
						const colorPicker = document.getElementById('toolBar__button_colorPicker');
						colorPicker.click();
					}}
				></button>
				<input
					type="color"
					className="form-control form-control-color"
					name="toolBar__button_colorPicker"
					id="toolBar__button_colorPicker"
					style={{ display: 'none' }}
					onChange={(event) => setColor(event)}
					defaultValue="#000000"
				/>
			</div>
			{/* right buttons */}
			<div>
				<button className="toolBar__button_undo" onClick={() => undoAction()}></button>
				<button className="toolBar__button_redo" onClick={() => redoAction()}></button>
				<button className="toolBar__button_save"></button>
			</div>
		</div>
	);
};

export { ToolBar };
