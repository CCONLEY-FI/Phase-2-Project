// GameManagement.js
import React, { useEffect, useState } from "react";
import GameForm from "./GameForm";

function GameManagement() {
    const [message, setMessage] = useState("");
    const [gameToUpdate, setGameToUpdate] = useState(null);
    const [titleToDelete, setTitleToDelete] = useState("");
    

    const handleSubmit = async (gameData, action) => {
        try {
            if (action === "add") {
                await addGame(gameData);
            } else if (action === "update") {
                await updateGame(gameData);
            }
            setGameToUpdate(null); // Reset the update game state
        } catch (error) {
            setMessage(`Failed to ${action} game. Error: ${error.message}`);
        }
        const timeoutID = setTimeout(() => setMessage(""), 5000);
        useEffect(() => {
            return () => clearTimeout(timeoutID);
        }, []);
    };

    const addGame = async (newGameData) => {
        const response = await fetch("http://localhost:3001/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGameData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const addedGame = await response.json();
        setMessage(`Game "${addedGame.name}" added successfully.`);
    };

    const updateGame = async (gameData) => {
        const response = await fetch(
            `http://localhost:3001/games/${gameData.id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(gameData),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedGame = await response.json();
        setMessage(`Game "${updatedGame.name}" updated successfully.`);
    };

    const deleteGame = async () => {
        // Ensure that a title has been provided
        if (!titleToDelete) {
            setMessage("Please enter a title to delete.");
            return;
        }

        try {
            // Fetch the list of games to find the game to delete
            const response = await fetch("http://localhost:3001/games");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const games = await response.json();
            const gameToDelete = games.find(
                (game) =>
                    game.name.toLowerCase() === titleToDelete.toLowerCase()
            );

            // If game is not found, inform the user
            if (!gameToDelete) {
                setMessage(`No game found with title "${titleToDelete}".`);
                return;
            }

            // Send a DELETE request to the server to delete the game
            const deleteResponse = await fetch(
                `http://localhost:3001/games/${gameToDelete.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!deleteResponse.ok) {
                throw new Error(`HTTP error! status: ${deleteResponse.status}`);
            }

            // Inform the user of the successful deletion and reset the form
            setMessage(`Game "${titleToDelete}" deleted successfully.`);
            setTitleToDelete("");
        } catch (error) {
            setMessage(`Failed to delete game. Error: ${error.message}`);
        } finally {
            // Clear the message after 5 seconds
            setTimeout(() => setMessage(""), 5000);
        }
    };

    return (
        <div>
            <GameForm onSubmit={handleSubmit} gameToUpdate={gameToUpdate} />
            <div>
                <input
                    type='text'
                    placeholder='Title to delete'
                    value={titleToDelete}
                    onChange={(e) => setTitleToDelete(e.target.value)}
                />
                <button onClick={deleteGame}>Delete Game</button>
            </div>
            <p>{message}</p>
        </div>
    );
}

export default GameManagement;
