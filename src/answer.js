// ==================================================== //
// ==== This file contains all the functions that === //
// ==== handles the answer ========================= //
// ================================================ //


// ==== Audio/Sounds ==== //
import {
  letsPlayAudio,
  selectedAnswerAudio,
  correctAnswerAudio,
  wrongAnswerAudio
} from "./audio.js";

import {
  displayNextQuestion
} from "./question.js";

// ==== Game State Functions ==== //
import {
  endGame,
  nextQuestion
} from "./gameState.js";

// ==== Buttons ==== //
import {
  revealAnswerBtn,
  nextQuestionBtn,
  newGameBtn
} from "./button.js";

// ==== Lifeline Functions ==== //
import {
  clearLifelineText
} from "./lifeline.js";

// ==== Track selected answer ==== //
let selectedAnswerIndex = null;
let isAnswerRevealed = false;

// ================================= //
// ==== Handle Answer Function ==== //
// =============================== //
function handleAnswer(e) {
  // Prevent selecting if answer already revealed
  if (isAnswerRevealed) return;
  
  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  selectedAnswerIndex = e.target.dataset.id;
  let options = document.getElementsByClassName("options");
  options = Array.from(options);

  // Clear previous selection
  options.forEach(option => {
    option.classList.remove("selected-answer");
  });

  // Highlight selected answer
  if (playAudio) {
    letsPlayAudio.pause();
    selectedAnswerAudio.play();
  }
  options[selectedAnswerIndex].classList.add("selected-answer");

  // Show reveal answer button
  revealAnswerBtn.classList.remove("hidden");
  nextQuestionBtn.classList.add("hidden");
  newGameBtn.classList.add("hidden");
}

// ==================================== //
// ==== Reveal Answer Function ==== //
// ================================== //
function revealAnswer() {
  if (selectedAnswerIndex === null) return;
  
  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  const currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
  const currentAnswer = currentQuestion.correct;
  let options = document.getElementsByClassName("options");
  options = Array.from(options);

  // Stop selection audio
  selectedAnswerAudio.pause();
  selectedAnswerAudio.currentTime = 0;

  // Clear lifeline text indicators
  clearLifelineText();

  isAnswerRevealed = true;

  if (selectedAnswerIndex != currentAnswer) {
    // Wrong answer
    options[selectedAnswerIndex].classList.replace(
      "selected-answer",
      "wrong-answer"
    );
    if (playAudio) wrongAnswerAudio.play();
    
    // Show correct answer
    options[currentAnswer].classList.add("correct-answer");
    
    // Show new game button
    revealAnswerBtn.classList.add("hidden");
    newGameBtn.classList.remove("hidden");
    
    // Disable all options
    disableOptions();
    
  } else {
    // Correct answer
    options[selectedAnswerIndex].classList.remove("selected-answer");
    options[selectedAnswerIndex].classList.add("correct-answer");
    if (playAudio) correctAnswerAudio.play();
    
    // Check if this was the last question
    let questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
    
    if (questionNumber >= 15) {
      // Player won - show new game button
      setTimeout(() => {
        newGameBtn.classList.remove("hidden");
      }, 2000);
      revealAnswerBtn.classList.add("hidden");
      disableOptions();
    } else {
      // Show next question button
      revealAnswerBtn.classList.add("hidden");
      nextQuestionBtn.classList.remove("hidden");
      disableOptions();
    }
  }
}

// ======================================= //
// ==== Handle Next Question Button ==== //
// ===================================== //
function handleNextQuestion() {
  // Stop any playing audio
  correctAnswerAudio.pause();
  correctAnswerAudio.currentTime = 0;
  wrongAnswerAudio.pause();
  wrongAnswerAudio.currentTime = 0;
  
  // Move to next question level
  const canContinue = nextQuestion();
  if (canContinue) {
    // Reset state
    selectedAnswerIndex = null;
    isAnswerRevealed = false;
    nextQuestionBtn.classList.add("hidden");
    enableOptions();
    displayNextQuestion();
  }
}

// ================================== //
// ==== Handle New Game Button ==== //
// ================================ //
function handleNewGame() {
  location.reload();
}

// ============================ //
// ==== Disable Options ==== //
// ======================== //
function disableOptions() {
  let options = document.getElementsByClassName("options");
  Array.from(options).forEach(option => {
    option.style.pointerEvents = "none";
  });
}

// =========================== //
// ==== Enable Options ==== //
// ========================= //
function enableOptions() {
  let options = document.getElementsByClassName("options");
  Array.from(options).forEach(option => {
    option.style.pointerEvents = "auto";
  });
}

export {
  handleAnswer,
  revealAnswer,
  handleNextQuestion,
  handleNewGame
}