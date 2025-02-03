import Board from "./Board";
import { useState, useEffect } from "react";
import GameState from "./GameState";
import GameOver from "./GameOver";
import Reset from "./Reset";
import gameOverSoundAsset from '../sounds/game_over.wav';
import clickSoundAsset from '../sounds/click.wav';

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const winningCombanations = [
    //Rows
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },

    //Columns
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },

    //Diagonals
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" }
]
function checkWinner(tiles, setStrikeClass, setCurrentGameState) {
    for (const { combo, strikeClass } of winningCombanations) {
        const [index1, index2, index3] = combo;
        const tileValue1 = tiles[index1];
        const tileValue2 = tiles[index2];
        const tileValue3 = tiles[index3];

        if (
            tileValue1 !== null &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3
        ) {
            setStrikeClass(strikeClass);
            setCurrentGameState(
                tileValue1 === PLAYER_X
                    ? GameState.playerXWins
                    : GameState.playerOWins
            );
            return;
        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
    if (areAllTilesFilledIn) {
        setCurrentGameState(GameState.draw);
    }
}
function TicTacToe() {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState();
    const [currentGameState, setCurrentGameState] = useState(GameState.inProgress);

    const handleTileClick = (index) => {
        if (currentGameState !== GameState.inProgress) {
            return;
        }
        if (tiles[index] !== null) {
            return;
        }

        const newTiles = [...tiles];
        newTiles[index] = playerTurn;
        setTiles(newTiles);
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O)
        }
        else {
            setPlayerTurn(PLAYER_X)
        }
    };

    const handleReset = () => {
        setCurrentGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    };

    useEffect(() => {
        checkWinner(tiles, setStrikeClass, setCurrentGameState);
    }, [tiles]);

    useEffect(() => {
        try {
            if (tiles.some((tile) => tile !== null)) {
                clickSound.play();
            }
        } catch (err) {
            console.error('Click sound error:', err);
        }
    }, [tiles]);

    useEffect(() => {
        try {
            if (currentGameState !== GameState.inProgress) {
                gameOverSound.play();
            }
        } catch (err) {
            console.error('Game over sound error:', err);
        }
    }, [currentGameState]);

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board
                playerTurn={playerTurn}
                tiles={tiles}
                onTileClick={handleTileClick}
                strikeClass={strikeClass} />
            <GameOver currentGameState={currentGameState} />
            <Reset currentGameState={currentGameState} onReset={handleReset} />
        </div>
    );
}

export default TicTacToe;