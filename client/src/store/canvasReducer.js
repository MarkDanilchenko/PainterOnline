import { createSlice } from '@reduxjs/toolkit';

const canvasReducer = createSlice({
	name: 'canvasReducer',
	initialState: {
		canvas: null,
	},
	reducers: {
		setCanvas: (state, action) => {
			state.canvas = action.payload;
		},
	},
});

const { setCanvas } = canvasReducer.actions;
const reducer = canvasReducer.reducer;

export { setCanvas, reducer as canvasReducer };
