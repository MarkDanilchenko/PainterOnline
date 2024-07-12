import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLineWidth } from '../store/toolsReducer.js';

const SettingsBar = (props) => {
	const dispatch = useDispatch();

	return (
		<div className="settingsBar">
			<div>
				<label htmlFor="lineWidth" className="form-label">
					Line Width
				</label>
				<input
					type="number"
					className="form-control form-control-sm"
					name="lineWidth"
					id="lineWidth"
					min="1"
					max="50"
					defaultValue="1"
					onChange={(event) => {
						dispatch(setLineWidth(event.target.value));
					}}
				/>
			</div>
		</div>
	);
};

export { SettingsBar };
