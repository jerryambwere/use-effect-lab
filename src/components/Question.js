import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Function to handle the countdown
    const countdown = () => {
      setTimeRemaining(prevTime => {
        if (prevTime <= 1) {
          // When time runs out, reset timer and call onAnswered
          onAnswered(false);
          return 10; // Reset time remaining for the next question
        }
        // Decrease time remaining
        return prevTime - 1;
      });
    };

    // Set up the interval
    const timerId = setInterval(countdown, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timerId);
  }, [onAnswered]);
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
