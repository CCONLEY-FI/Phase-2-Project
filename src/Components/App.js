import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import GameList from './GameList';
import GameDetails from './GameDetails';
import GameManagement from './GameManagement';
import '../App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GameList />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/manage-games" element={<GameManagement />} />
      </Routes>
    </Router>
  );
}

export default App;