import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { canvasReducer } from './canvasReducer.js';
import { toolsReducer } from './toolsReducer.js';
import { connectionReducer } from './connectionReducer.js';

const rootReducer = combineReducers({
  canvasReducer: canvasReducer,
  toolsReducer: toolsReducer,
  connectionReducer: connectionReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

export default store;
