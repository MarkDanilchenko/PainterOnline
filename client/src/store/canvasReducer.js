import { createSlice } from '@reduxjs/toolkit';

const canvasReducer = createSlice({
	name: 'canvasReducer',
	initialState: {
		canvas: null,
		undoList: [],
		redoList: [],
	},
	reducers: {
		setCanvas: (state, action) => {
			state.canvas = action.payload;
		},
		pushToUndoList: (state, action) => {
			state.undoList.push(action.payload);
		},
		pushToRedoList: (state, action) => {
			state.redoList.push(action.payload);
		},
		undo: (state, action) => {
			const ctx = state.canvas.getContext('2d');
			state.redoList.push(state.canvas.toDataURL());
			ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
			ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
			state.undoList.pop();
		},
		redo: (state, action) => {
			const ctx = state.canvas.getContext('2d');
			state.undoList.push(state.canvas.toDataURL());
			ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
			ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
			state.redoList.pop();
		},
	},
});

const { setCanvas, pushToUndoList, pushToRedoList, undo, redo } = canvasReducer.actions;
const reducer = canvasReducer.reducer;

export { setCanvas, pushToUndoList, pushToRedoList, undo, redo, reducer as canvasReducer };
