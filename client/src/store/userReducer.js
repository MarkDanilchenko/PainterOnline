import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
	name: 'userReducer',
	initialState: {
		username: null,
	},
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
	},
});

const { setUsername } = userReducer.actions;
const reducer = userReducer.reducer;

export { reducer as userReducer, setUsername };
