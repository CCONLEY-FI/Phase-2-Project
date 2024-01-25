// GameForm.js
import React, { useState, useEffect } from "react";

function GameForm({ onSubmit, gameToUpdate }) {
    const [gameData, setGameData] = useState({
        name: "",
        rating: 0,
        review: "",
        image: "",
        tags: "",
    });

    useEffect(() => {
        if (gameToUpdate) {
            setGameData({
                ...gameToUpdate,
                tags: gameToUpdate.tags.join(", "), // Convert the array of tags to a comma-separated string
            });
        }
    }, [gameToUpdate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setGameData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {
            ...gameData,
            rating: Number(gameData.rating), // Ensure rating is a number
            tags: gameData.tags.split(",").map((tag) => tag.trim()),
        };
        onSubmit(dataToSubmit, gameToUpdate ? "update" : "add"); // Use 'update' or 'add' based on whether gameToUpdate is defined
        setGameData({
            name: "",
            rating: 0,
            review: "",
            image: "",
            tags: "",
        }); // Reset form after submission
    };

    return (
        <form className='game-form' onSubmit={handleSubmit}>
            <input
                name='name'
                value={gameData.name}
                onChange={handleChange}
                placeholder='Game name'
                required
            />
            <input
                name='rating'
                type='number'
                value={gameData.rating}
                onChange={handleChange}
                placeholder='Rating'
                required
            />
            <input
                name='image'
                value={gameData.image}
                onChange={handleChange}
                placeholder='Image URL'
                required
            />
            <input
                name='tags'
                value={gameData.tags}
                onChange={handleChange}
                placeholder='Tags (comma-separated)'
                required
            />
            <div className='review-box'>
                <textarea
                    className='review-box'
                    name='review'
                    value={gameData.review}
                    onChange={handleChange}
                    placeholder='Review'
                />
            </div>
            <button type='submit'>
                {gameToUpdate ? "Update Game" : "Add Game"}
            </button>
        </form>
    );
}

export default GameForm;
