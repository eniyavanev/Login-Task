import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
