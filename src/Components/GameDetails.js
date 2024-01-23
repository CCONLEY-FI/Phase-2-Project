// GameDetails.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function GameDetails() {
    const { id } = useParams();
    const [game, setGame] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/games/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setGame(data);
            } catch (err) {
                setError("Failed to fetch game details. Please try again or go back to the games list.");
            }
        };

        fetchGameDetails();
    }, [id]);

    if (error) {
        return (
            <div>
                <p>Error fetching game details: {error}</p>
                <Link to="/">Back to games list</Link>
            </div>
        );
    }

    if (!game) {
        return <div>Loading game details...</div>;
    }

    return (
        <div>
            <h1>{game.name}</h1>
            <img src={game.image} alt={game.name} />
            <p>Rating: {game.rating}</p>
            <p>Review: {game.review}</p>
            <Link to="/">Back to games list</Link>
        </div>
    );
}

export default GameDetails;