// GameList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link to navigate to GameDetails

function GameList() {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const fetchGames = async () => {
        try {
            const response = await fetch("http://localhost:3001/games");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const fetchedGames = await response.json();
            setGames(fetchedGames);
        } catch (err) {
            setError("Failed to fetch games. Please try again later.");
        }
    };

    useEffect(() => {
        fetchGames();
    }, []);

    if (error) {
        return (
            <div>
                <div>Error fetching games: {error}</div>
                <button onClick={fetchGames}>Retry</button>
            </div>
        );
    }

    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            {filteredGames.length > 0 ? (
                <ul>
                    {filteredGames.map((game) => (
                        <li key={game.id}>
                            <Link to={`/game/${game.id}`}>
                                <h2>{game.name}</h2>
                            </Link>
                            <img src={game.image} alt={game.name} />
                            <p>Rating: {game.rating}</p>
                            <p>Review: {game.review}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games found.</p>
            )}
        </div>
    );
}

export default GameList;