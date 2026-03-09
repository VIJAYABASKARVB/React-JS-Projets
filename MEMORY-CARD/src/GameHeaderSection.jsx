import React from "react";

const GameHeaderSection = ({ moves, time, restartGame }) => {
  return (
    <div className="header">

      <div className="stats">
        <h2>Moves: {moves}</h2>
        <h2>Time: {time}s</h2>
      </div>

      <button onClick={restartGame}>
        Restart
      </button>

    </div>
  );
};

export default GameHeaderSection;