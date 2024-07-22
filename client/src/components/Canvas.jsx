import React from "react";
import { useParams } from "react-router-dom";
import { setCanvas, pushToUndoList } from "../store/canvasReducer.js";
import { useDispatch } from "react-redux";
import axios from "axios";

const Canvas = (props) => {
	const dispatch = useDispatch();
	const canvasRef = React.useRef();
	const params = useParams();
	React.useEffect(() => {
		dispatch(setCanvas(canvasRef.current));
		console.log(`Canvas mounted: ${canvasRef.current.width}px x ${canvasRef.current.height}px`);
		axios
			.get(`http://${process.env.HOST_SERVER || "127.0.0.1"}:${process.env.PORT_SERVER || 5000}/api/v1/image?sessionId=${params.id}`)
			.then((res) => {
				const img = new Image();
				img.src = res.data.canvasImgData;
				img.onload = () => {
					canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
					if (img.width > canvasRef.current.width || img.height > canvasRef.current.height) {
						canvasRef.current.getContext("2d").drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
					} else {
						canvasRef.current.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
					}
				};
			})
			.catch((e) => {
				if (e.response.status && e.response.status === 404) {
					console.log(e.response.data.message);
				} else {
					console.log(e.message);
				}
				canvasRef.current.getContext("2d").clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
			});
	}, []);

	// Take a screenshot of the canvas every time mouse up and save it in the undo list (state).
	const mouseDownHandler = () => {
		dispatch(pushToUndoList(canvasRef.current.toDataURL()));
	};
	// If the mouse is up - save the current canvas image to the temporary files on the server.
	// So it can be restored later by other users who are connected to the same session.
	const mouseUpHandler = () => {
		axios
			.post(
				`http://${process.env.HOST_SERVER || "127.0.0.1"}:${process.env.PORT_SERVER || 5000}/api/v1/image?sessionId=${params.id}`,
				{
					canvasImgData: canvasRef.current.toDataURL(),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.catch((e) => {
				console.log(e.message);
			});
	};

	return (
		<div className="canvas">
			<canvas
				ref={canvasRef}
				id="canvas"
				onMouseDown={() => mouseDownHandler()}
				onMouseUp={() => mouseUpHandler()}
				width={props.width}
				height={props.height}
			></canvas>
		</div>
	);
};

export { Canvas };
