// src/Components/GameManagement.js
import React, { useState } from 'react';
import GameForm from './GameForm';

function GameManagement() {
  const [message, setMessage] = useState('');

  const addGame = async (newGameData) => {
    try {
      const response = await fetch('http://localhost:3001/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGameData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const addedGame = await response.json();
      setMessage(`Game "${addedGame.name}" added successfully.`);
    } catch (error) {
      setMessage(`Failed to add game. Error: ${error.message}`);
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div>
      <GameForm onSubmit={addGame} />
      {message && <p>{message}</p>}
    </div>
  );
}

export default GameManagement;