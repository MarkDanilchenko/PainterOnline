import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Main from '../pages/Main.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path='/:id' element={<Main />} />
      <Route path='/' element={<Navigate to={`${Math.random().toString(16).slice(2)}`} />} />
    </Routes>
  );
};

export default Router;
