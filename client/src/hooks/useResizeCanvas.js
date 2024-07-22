import React from "react";

const useResizeCanvas = () => {
	// Set up canvas max width size in px.
	const canvasMaxWidth = 1100;
	const [canvasHeight, setCanvasHeight] = React.useState(window.innerHeight * 0.6);
	const [canvasWidth, setCanvasWidth] = React.useState(window.innerWidth * 0.8 > canvasMaxWidth ? canvasMaxWidth : window.innerWidth * 0.8);
	React.useEffect(() => {
		const resizeCanvas = () => {
			setCanvasHeight(window.innerHeight * 0.6);
			setCanvasWidth(window.innerWidth * 0.8 > canvasMaxWidth ? canvasMaxWidth : window.innerWidth * 0.8);
		};
		window.addEventListener("resize", resizeCanvas);
		return () => window.removeEventListener("resize", resizeCanvas);
	}, []);

	return {
		canvasHeight: canvasHeight,
		canvasWidth: canvasWidth,
	};
};

export { useResizeCanvas };
