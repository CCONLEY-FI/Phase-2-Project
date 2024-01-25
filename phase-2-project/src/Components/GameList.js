// GameList.js
import React, { useState, useEffect } from "react";
import "../styles.css";

function GameList() {
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [expandedGameId, setExpandedGameId] = useState(null);

    const allTags = [...new Set(games.flatMap((game) => game.tags))];

    const getRandomTags = (tags, count) => {
        const shuffled = tags.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomTags = getRandomTags(allTags, 10);

    const fetchGames = async () => {
        try {
            const response = await fetch("http://localhost:3001/games");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const fetchedGames = await response.json();
            setGames(fetchedGames);
            console.log(fetchedGames);
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

    const filteredGames = games.filter(
        (game) =>
            game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            game.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

    const gameElements = filteredGames.map((game) => (
        <li key={game.id} className='game-element'>
            <img src={game.image} alt={game.name} />
            <div className='game-info'>
                <p className='game-rating'>Rating: {game.rating}</p>
                <p className='game-review'>Review: {game.review}</p>
                <div className='game-tags'>
                    {(expandedGameId === game.id
                        ? game.tags
                        : game.tags.slice(0, 3)
                    ).map((tag, index) => (
                        <span
                            key={index}
                            className='game-tag'
                            onClick={() => setSearchTerm(tag)}>
                            {tag}
                        </span>
                    ))}
                    {game.tags.length > 3 && (
                        <button
                            onClick={() =>
                                setExpandedGameId(
                                    expandedGameId === game.id ? null : game.id
                                )
                            }>
                            {expandedGameId === game.id ? "-" : "+"}
                        </button>
                    )}
                </div>
            </div>
        </li>
    ));

    return (
        <div>
            <div className='search-bar-container'>
                <input
                    type='text'
                    placeholder='Search games...'
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>
            <div className='tag-cloud'>
                {randomTags.map((tag, index) => (
                    <button
                        key={index}
                        className='tag-button'
                        onClick={() => setSearchTerm(tag)}>
                        {tag}
                    </button>
                ))}
            </div>

            {gameElements.length > 0 ? (
                <ul className='game-grid'>{gameElements}</ul>
            ) : (
                <p>No games found.</p>
            )}
        </div>
    );
}

export default GameList;
