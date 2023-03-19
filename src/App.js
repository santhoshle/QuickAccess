import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddPage from './pages/AddPage';

import './App.css';

function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<AddPage />} />
        </Routes>
      </Router>
    );
}

export default App;