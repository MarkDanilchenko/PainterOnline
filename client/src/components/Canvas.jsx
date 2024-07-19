import React from 'react';
import { setCanvas, pushToUndoList } from '../store/canvasReducer.js';
import { useDispatch } from 'react-redux';

const Canvas = (props) => {
	const canvasRef = React.useRef();
	const dispatch = useDispatch();
	React.useEffect(() => {
		console.log(`Canvas mounted: ${canvasRef.current.width}px x ${canvasRef.current.height}px`);
		dispatch(setCanvas(canvasRef.current));
	}, []);

	// Like take a screenshot of the canvas and save it in the undo list (state).
	const mouseDownHandler = () => {
		dispatch(pushToUndoList(canvasRef.current.toDataURL()));
	};

	return (
		<div className="canvas">
			<canvas ref={canvasRef} id="canvas" onMouseDown={() => mouseDownHandler()} width={props.width} height={props.height}></canvas>
		</div>
	);
};

export { Canvas };
