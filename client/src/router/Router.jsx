import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '../pages/Main.jsx';

const Router = (props) => {
	return (
		<Routes>
			<Route path="/:id" element={<Main />} />
			{/* Fallback route to set unique id in the URL (that is emulating session) for users. */}
			<Route path="/" element={<Navigate to={`${Math.random().toString(16).slice(2)}`} />} />
		</Routes>
	);
};

export { Router };
