import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '../pages/Main.jsx';

const Router = (props) => {
	return (
		<Routes>
			<Route path="/:id" element={<Main />} />
			{/* Fallback route to set unique id for each user. */}
			<Route path="/" element={<Navigate to={`${Math.random().toString(16).slice(2)}`} />} />
		</Routes>
	);
};

export { Router };
