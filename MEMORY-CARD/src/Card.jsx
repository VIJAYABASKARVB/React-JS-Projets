import React from "react";

const Card = ({ emoji, flipped, handleClick }) => {

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>

      <div className="card-inner">

        <div className="card-front">
          ❓
        </div>

        <div className="card-back">
          {emoji}
        </div>

      </div>

    </div>
  );

};

export default Card;