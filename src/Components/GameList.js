// src/Components/GameList.js
import React, { useState, useEffect } from 'react';

function GameList() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/games')  // Adjust according to your json-server URL
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setGames(data))
      .catch(error => setError(error.message));
  }, []);

  if (error) return <div>Error fetching games: {error}</div>;

  return (
    <ul>
      {games.map(game => (
        <li key={game.id}>
          <h2>{game.name}</h2>
          <img src={game.image} alt={game.name} />
          <p>Rating: {game.rating}</p>
          <p>Review: {game.review}</p>
        </li>
      ))}
    </ul>
  );
}

export default GameList;