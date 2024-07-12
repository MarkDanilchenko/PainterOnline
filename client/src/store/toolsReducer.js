import { createSlice } from '@reduxjs/toolkit';

const toolsReducer = createSlice({
	name: 'toolsReducer',
	initialState: {
		tool: null,
	},
	reducers: {
		setTool: (state, action) => {
			state.tool = action.payload;
		},
		setFillColor: (state, action) => {
			state.tool.setFillColor(action.payload);
		},
		setStrokeColor: (state, action) => {
			state.tool.setStrokeColor(action.payload);
		},
		setLineWidth: (state, action) => {
			state.tool.setLineWidth(action.payload);
		},
	},
});

const { setTool, setFillColor, setStrokeColor, setLineWidth } = toolsReducer.actions;
const reducer = toolsReducer.reducer;

export { setTool, setFillColor, setStrokeColor, setLineWidth, reducer as toolsReducer };
