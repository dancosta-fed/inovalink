import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/login';
import Home from './pages/home';
import ProjectDetails from './pages/ProjectDetails';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
