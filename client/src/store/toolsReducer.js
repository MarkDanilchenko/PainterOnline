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
	},
});

const { setTool } = toolsReducer.actions;
const reducer = toolsReducer.reducer;

export { setTool, reducer as toolsReducer };
