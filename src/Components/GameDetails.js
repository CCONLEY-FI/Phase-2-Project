// src/Components/GameDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/games/${id}`)  // Make sure the URL matches your setup
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setGame(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) return <div>Error fetching game details: {error}</div>;
  if (!game) return <div>Loading...</div>;

  return (
    <div>
      <h1>{game.name}</h1>
      <img src={game.image} alt={game.name} />
      <p>Rating: {game.rating}</p>
      <p>Review: {game.review}</p>
    </div>
  );
}

export default GameDetails;