import React, { useEffect, useReducer } from "react";
import GameForm from "./GameForm";
import "../styles.css";

const initialState = {
    message: "",
    gameToUpdate: null,
    games: [],
    action: "", // Possible values: ["add", "update", "delete"]
    inputtedTitle: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_MESSAGE":
            return { ...state, message: action.payload };
        case "SET_INPUTTED_TITLE":
            return { ...state, inputtedTitle: action.payload };
        case "SET_GAME_TO_UPDATE":
            return { ...state, gameToUpdate: action.payload };
        case "SET_GAMES":
            return { ...state, games: action.payload };
        case "SET_ACTION":
            return { ...state, action: action.payload };
        case "SET_SEARCH":
            return { ...state, inputtedTitle: action.payload };
        default:
            throw new Error();
    }
}

function GameManagement() {
    const [state, dispatch] = useReducer(reducer, initialState);
    let timeoutId;

    const handleActionClick = (action) => {
        const gameToActOn = state.games.find(
            (game) => game.name === state.inputtedTitle
        );
        if (gameToActOn) {
            if (action === "update") {
                dispatch({ type: "SET_GAME_TO_UPDATE", payload: gameToActOn });
                dispatch({ type: "SET_ACTION", payload: "update" });
            } else if (action === "delete") {
                manageGame({ id: gameToActOn.id }, "delete");
            }
        } else {
            dispatch({
                type: "SET_MESSAGE",
                payload: `Game "${state.inputtedTitle}" not found.`,
            });
            timeoutId = setTimeout(
                () => dispatch({ type: "SET_MESSAGE", payload: "" }),
                5000
            );
        }
    };

    const fetchGames = async () => {
        const r = await fetch("http://localhost:3001/games");
        if (!r.ok) {
            throw new Error(`HTTP error! status: ${r.status}`);
        }
        const games = await r.json();
        dispatch({ type: "SET_GAMES", payload: games });
    };

    useEffect(() => {
        fetchGames();
        return () => clearTimeout(timeoutId);
    }, []);

    const manageGame = async (gameData, action) => {
        let method, url, body;
        if (action === "add") {
            method = "POST";
            url = "http://localhost:3001/games";
            body = JSON.stringify(gameData);
        } else if (action === "update") {
            method = "PATCH";
            url = `http://localhost:3001/games/${gameData.id}`;
            body = JSON.stringify(gameData);
        } else if (action === "delete") {
            method = "DELETE";
            url = `http://localhost:3001/games/${gameData.id}`;
        }

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const game = await response.json();
        dispatch({
            type: "SET_MESSAGE",
            payload: `Game "${game.name}" ${action}ed successfully.`,
        });

        timeoutId = setTimeout(
            () => dispatch({ type: "SET_MESSAGE", payload: "" }),
            5000
        );

        if (action === "update") {
            dispatch({ type: "SET_GAME_TO_UPDATE", payload: null });
            dispatch({ type: "SET_ACTION", payload: "" });
        }
        fetchGames();
    };

    return (
        <div className='Game-Management'>
            <h1>Game Management</h1>
            <div>
                <input
                    type='text'
                    placeholder='Game title'
                    value={state.inputtedTitle}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_INPUTTED_TITLE",
                            payload: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <button
                    onClick={() =>
                        dispatch({ type: "SET_ACTION", payload: "add" })
                    }>
                    Add Game
                </button>
                <button onClick={() => handleActionClick("update")}>
                    Update Game
                </button>
                <button onClick={() => handleActionClick("delete")}>
                    Delete Game
                </button>
            </div>
            {state.action === "add" ? (
                <GameForm onSubmit={manageGame} gameToUpdate={null} />
            ) : null}
            {state.action === "update" && state.gameToUpdate ? (
                <GameForm
                    onSubmit={manageGame}
                    gameToUpdate={state.gameToUpdate}
                />
            ) : null}
            <p>{state.message}</p>
            <div>
                <h2 className='game-management-list'>Games List</h2>
                {state.games.length > 0 ? (
                    <div className='game-management-list'>
                        {state.games.map((game) => (
                            <div
                                key={game.id}
                                className='game-management-element'
                                onClick={() =>
                                    dispatch({
                                        type: "SET_SEARCH",
                                        payload: game.name,
                                    })
                                }>
                                {game.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No games available.</p>
                )}
            </div>
        </div>
    );
}
export default GameManagement;
