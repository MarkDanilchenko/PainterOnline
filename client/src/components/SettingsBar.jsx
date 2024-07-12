import React from 'react';

const SettingsBar = (props) => {
	return (
		<div className="settingsBar">
			<div>
				<label htmlFor="lineWidth" className="form-label">
					Line Width
				</label>
				<input type="number" className="form-control form-control-sm" name="lineWidth" id="lineWidth" min="1" max="50" defaultValue="1" />
			</div>
		</div>
	);
};

export { SettingsBar };
