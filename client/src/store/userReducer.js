import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
	name: 'userReducer',
	initialState: {
		username: null,
		sessionId: null,
		socket: null,
	},
	reducers: {
		setUsername: (state, action) => {
			state.username = action.payload;
		},
		setSessionId: (state, action) => {
			state.sessionId = action.payload;
		},
		setSocket: (state, action) => {
			state.socket = action.payload;
		},
	},
});

const { setUsername, setSessionId, setSocket } = userReducer.actions;
const reducer = userReducer.reducer;

export { reducer as userReducer, setUsername, setSessionId, setSocket };
