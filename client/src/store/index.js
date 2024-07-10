import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { canvasReducer } from './canvasReducer.js';
import { toolsReducer } from './toolsReducer.js';

const rootReducer = combineReducers({
	canvasReducer: canvasReducer,
	toolsReducer: toolsReducer,
});
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export { store };
