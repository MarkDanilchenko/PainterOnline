import { createSlice } from '@reduxjs/toolkit';

const connectionReducer = createSlice({
  name: 'connectionReducer',
  initialState: {
    username: null,
    sessionId: null,
    socket: null
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
    }
  }
});
const { setUsername, setSessionId, setSocket } = connectionReducer.actions;
const reducer = connectionReducer.reducer;

export { setUsername, setSessionId, setSocket, reducer as connectionReducer };
