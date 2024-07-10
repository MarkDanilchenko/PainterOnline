import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTool } from '../store/toolsReducer.js';
import { Brush } from '../services/tools_handler.js';

const ToolBar = (props) => {
	const dispatch = useDispatch();
	const canvas = useSelector((state) => {
		return state.canvasReducer.canvas;
	});

	return (
		<div className="toolBar">
			<div>
				<button className="toolBar__button_brush" onClick={() => dispatch(setTool(new Brush(canvas)))}></button>
				<button className="toolBar__button_square"></button>
				<button className="toolBar__button_circle"></button>
				<button className="toolBar__button_eraser"></button>
				<button className="toolBar__button_line"></button>
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
