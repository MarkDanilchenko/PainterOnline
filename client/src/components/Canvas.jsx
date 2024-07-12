import React from 'react';
import { setCanvas } from '../store/canvasReducer.js';
import { useDispatch } from 'react-redux';

const Canvas = (props) => {
	const canvasRef = React.useRef();
	const dispatch = useDispatch();

	React.useEffect(() => {
		console.log(`Canvas mounted: ${canvasRef.current.width}px x ${canvasRef.current.height}px`);
		dispatch(setCanvas(canvasRef.current));
	});

	return (
		<div className="canvas">
			<canvas ref={canvasRef} id="canvas" width={props.width} height={props.height}></canvas>
		</div>
	);
};

export { Canvas };
