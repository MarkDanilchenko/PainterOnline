import React from 'react';

const Canvas = (props) => {
	return (
		<div className="canvas">
			<canvas id="canvas" width={props.width} height={props.height}></canvas>
		</div>
	);
};

export { Canvas };
