import PropTypes from 'prop-types';

function Tile({ className, value, onClick, playerTurn }) {
    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }
    return (
        <div onClick={onClick} className={`tile ${className} ${hoverClass}`}>
            {value}
        </div>
    );
}

Tile.propTypes = {
    className: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    playerTurn: PropTypes.string,
};

export default Tile;