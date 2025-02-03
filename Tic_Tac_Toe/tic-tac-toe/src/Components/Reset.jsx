import GameState from "./GameState";
import PropTypes from 'prop-types';

function Reset({currentGameState, onReset}) {
    if(currentGameState === GameState.inProgress){
        return;
    }
    return  <button onClick={onReset} className="reset-button">Play Again</button> ;
}

Reset.propTypes = {
    currentGameState: PropTypes.number.isRequired,
    onReset: PropTypes.func.isRequired,
};

export default Reset;