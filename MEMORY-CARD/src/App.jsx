import React, { useEffect, useState } from "react";
import Card from "./Card";
import GameHeaderSection from "./GameHeaderSection";
import "./index.css";

const initialCards = [
  { id: 1, emoji: "🍒", flipped: false },
  { id: 2, emoji: "🍋", flipped: false },
  { id: 3, emoji: "🍎", flipped: false },
  { id: 4, emoji: "🍇", flipped: false },
  { id: 5, emoji: "🍒", flipped: false },
  { id: 6, emoji: "🍋", flipped: false },
  { id: 7, emoji: "🍎", flipped: false },
  { id: 8, emoji: "🍇", flipped: false }
];

const App = () => {

  function shuffleCards(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const [cards, setCards] = useState(shuffleCards(initialCards));
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [isChecking, setChecking] = useState(false);
  const [moves, setMoves] = useState(0);

  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  

  function flipCard(id) {

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (isChecking) return;

    const clickedCard = cards.find(card => card.id === id);

    if (clickedCard.flipped) return;
    if (firstCard && firstCard.id === id) return;

    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, flipped: true } : card
      )
    );

    if (!firstCard) {
      setFirstCard(clickedCard);
    } else {
      setSecondCard(clickedCard);
      setMoves(prev => prev + 1);
    }
  }


  useEffect(() => {

    if (firstCard && secondCard) {

      setChecking(true);

      if (firstCard.emoji === secondCard.emoji) {

        setFirstCard(null);
        setSecondCard(null);
        setChecking(false);

      } else {

        setTimeout(() => {

          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );

          setFirstCard(null);
          setSecondCard(null);
          setChecking(false);

        }, 800);

      }

    }

  }, [secondCard]);


  useEffect(() => {

    if (!gameStarted) return;

    const allFlipped = cards.every(card => card.flipped);

    if (allFlipped) {
      setGameWon(true);
    }

  }, [cards]);


  useEffect(() => {

    if (!gameStarted || gameWon) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [gameStarted, gameWon]);


  function restartGame() {

    setCards(shuffleCards(initialCards));
    setFirstCard(null);
    setSecondCard(null);
    setChecking(false);
    setMoves(0);
    setTime(0);
    setGameWon(false);
    setGameStarted(false);

  }

  return (
    <div className="game-container">

      <GameHeaderSection
        moves={moves}
        time={time}
        restartGame={restartGame}
      />

      {gameWon && (
        <div className="win-screen">
          <h1>🎉 You Won!</h1>
          <p>Moves: {moves}</p>
          <p>Time: {time}s</p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}

      <div className="game-board">
        {cards.map(card => (
          <Card
            key={card.id}
            emoji={card.emoji}
            flipped={card.flipped}
            handleClick={() => flipCard(card.id)}
          />
        ))}
      </div>

    </div>
  );
};

export default App;