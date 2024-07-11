import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../store/toolsReducer.js';
import { Brush, Rectangle, Circle, Eraser, Line } from '../services/tools_handler.js';

const ToolBar = (props) => {
	const dispatch = useDispatch();
	const canvas = useSelector((state) => {
		return state.canvasReducer.canvas;
	});
	const selectedTool = useSelector((state) => {
		return state.toolsReducer.tool;
	});

	return (
		<div className="toolBar">
			<div>
				<button
					className={`toolBar__button_brush ${selectedTool instanceof Brush ? 'active' : ''}`}
					onClick={() => dispatch(setTool(new Brush(canvas)))}
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
				<input type="color" name="toolBar__button_colorPicker" id="toolBar__button_colorPicker" style={{ display: 'none' }} />
			</div>
			<div>
				<button className="toolBar__button_undo"></button>
				<button className="toolBar__button_redo"></button>
				<button className="toolBar__button_save"></button>
			</div>
		</div>
	);
};

export { ToolBar };
