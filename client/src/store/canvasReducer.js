import { createSlice } from '@reduxjs/toolkit';

const canvasReducer = createSlice({
  name: 'canvasReducer',
  initialState: {
    canvas: null,
    undoStateList: [],
    redoStateList: []
  },
  reducers: {
    setCanvasDefaultSettings: (state) => {
      const ctx = state.canvas.getContext('2d');
      ctx.lineCap = 'round';
    },
    setCanvas: (state, action) => {
      state.canvas = action.payload;
    },
    pushToUndoStateList: (state, action) => {
      state.undoStateList.push(action.payload);
    },
    syncUndoStateList: (state, action) => {
      state.undoStateList = [...action.payload];
    },
    undoAction: (state, action) => {
      const ctx = state.canvas.getContext('2d');
      state.redoStateList.push(state.canvas.toDataURL());
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      ctx.drawImage(action.payload, 0, 0, action.payload.width, action.payload.height);
      state.undoStateList.pop();
    },
    redoAction: (state, action) => {
      const ctx = state.canvas.getContext('2d');
      state.undoStateList.push(state.canvas.toDataURL());
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
      ctx.drawImage(action.payload, 0, 0, state.canvas.width, state.canvas.height);
      state.redoStateList.pop();
    },
    clearCanvas: (state) => {
      const ctx = state.canvas.getContext('2d');
      ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
    }
  }
});

const {
  setCanvas,
  setCanvasDefaultSettings,
  clearCanvas,
  pushToUndoStateList,
  syncUndoStateList,
  undoAction,
  redoAction
} = canvasReducer.actions;
const reducer = canvasReducer.reducer;

export {
  setCanvas,
  setCanvasDefaultSettings,
  clearCanvas,
  pushToUndoStateList,
  syncUndoStateList,
  undoAction,
  redoAction,
  reducer as canvasReducer
};
