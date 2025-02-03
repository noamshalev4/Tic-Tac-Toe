import GameState from "./GameState";
import PropTypes from 'prop-types';

function GameOver({ currentGameState }) {
    switch (currentGameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerOWins:
            return <div className="game-over">O Wins</div>;
        case GameState.playerXWins:
            return <div className="game-over">X Wins</div>;
        case GameState.draw:
            return <div className="game-over">Draw</div>;

        default:
            return <></>;
    }
}

GameOver.propTypes = {
    currentGameState: PropTypes.number.isRequired,
};

export default GameOver;