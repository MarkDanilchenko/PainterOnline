import React from 'react';

const ToolBar = (props) => {
	return (
		<div className="toolBar">
			<div>
				<button className="toolBar__button_brush"></button>
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
				<input
					type="color"
					name="toolBar__button_colorPicker"
					id="toolBar__button_colorPicker"
                    style={{ display: 'none' }}
				/>
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
