// ==================================================== //
// ==== This file contains all the functions that === //
// ==== handles the answer ========================= //
// ================================================ //


// ==== Audio/Sounds ==== //
import {
  letsPlayAudio,
  selectedAnswerAudio,
  correctAnswerAudio,
  correctQ1Q4Audio,
  wrongAnswerAudio,
  sayGoodbyeAudio,
  fiftyFiftyAudio,
  phoneFriendAudio,
  askAudienceAudio,
  question2000Audio,
  question4000Audio,
  question8000Audio,
  question16000Audio,
  question32000Audio,
  question64000Audio,
  question125000Audio,
  question250000Audio,
  question500000Audio,
  question1000000Audio,
  win2000Audio,
  win4000Audio,
  win8000Audio,
  win16000Audio,
  win32000Audio,
  win64000Audio,
  win125000Audio,
  win250000Audio,
  win500000Audio,
  win1000000Audio
} from "./audio.js";

import {
  displayNextQuestion
} from "./question.js";

// ==== Game State Functions ==== //
import {
  endGame,
  nextQuestion,
  updateMoneyLadder
} from "./gameState.js";

// ==== Buttons ==== //
import {
  showChoiceBtn,
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
let gameEndedByWrongAnswer = false;

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
    // Stop all background music when answer is locked in
    const allBackgroundAudios = [
      letsPlayAudio,
      question2000Audio,
      question4000Audio,
      question8000Audio,
      question16000Audio,
      question32000Audio,
      question64000Audio,
      question125000Audio,
      question250000Audio,
      question500000Audio,
      question1000000Audio,
      fiftyFiftyAudio,
      phoneFriendAudio,
      askAudienceAudio
    ];
    
    allBackgroundAudios.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    selectedAnswerAudio.play();
  }
  options[selectedAnswerIndex].classList.add("selected-answer");
  
  // Hide Show Choice button when answer is selected
  showChoiceBtn.classList.add("hidden");

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
    
    // Show correct answer
    options[currentAnswer].classList.add("correct-answer");
    
    // Disable all options
    disableOptions();
    
    if (playAudio) {
      // Play wrong answer audio
      wrongAnswerAudio.play();
    }
    
    // Mark that game ended due to wrong answer
    gameEndedByWrongAnswer = true;
    
    // Show new game button
    revealAnswerBtn.classList.add("hidden");
    newGameBtn.classList.remove("hidden");
    
  } else {
    // Correct answer
    options[selectedAnswerIndex].classList.remove("selected-answer");
    options[selectedAnswerIndex].classList.add("correct-answer");
    
    // Check if this was the last question
    let questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
    
    // Play appropriate audio based on question
    if (playAudio) {
      switch(questionNumber) {
        case 1:  // Q1
        case 2:  // Q2
        case 3:  // Q3
        case 4:  // Q4
        case 5:  // Q5
          correctQ1Q4Audio.play();
          break;
        case 6:  // $2,000
          win2000Audio.play();
          break;
        case 7:  // $4,000
          win4000Audio.play();
          break;
        case 8:  // $8,000
          win8000Audio.play();
          break;
        case 9:  // $16,000
          win16000Audio.play();
          break;
        case 10: // $32,000
          win32000Audio.play();
          break;
        case 11: // $64,000
          win64000Audio.play();
          break;
        case 12: // $125,000
          win125000Audio.play();
          break;
        case 13: // $250,000
          win250000Audio.play();
          break;
        case 14: // $500,000
          win500000Audio.play();
          break;
        case 15: // $1,000,000
          win1000000Audio.play();
          break;
        default:
          correctAnswerAudio.play();
      }
    }
    
    // Store the next question number but don't update ladder yet
    questionNumber++;
    localStorage.setItem('questionNumber', questionNumber.toString());
    
    if (questionNumber > 15) {
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
  correctQ1Q4Audio.pause();
  correctQ1Q4Audio.currentTime = 0;
  wrongAnswerAudio.pause();
  wrongAnswerAudio.currentTime = 0;
  
  // Question number already incremented in revealAnswer, now update the ladder
  let questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
  
  if (questionNumber > 15) {
    // Player won the game!
    console.log("🎉 Congratulations! You've won the game!");
    return;
  }
  
  // Update money ladder before showing next question
  updateMoneyLadder(questionNumber);
  
  // Reset state
  selectedAnswerIndex = null;
  isAnswerRevealed = false;
  nextQuestionBtn.classList.add("hidden");
  enableOptions();
  displayNextQuestion();
}

// ================================== //
// ==== Handle New Game Button ==== //
// ================================ //
function handleNewGame() {
  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  // Only play goodbye tune if game ended due to wrong answer (not if player won)
  if (playAudio && gameEndedByWrongAnswer) {
    // Play goodbye audio before reloading
    sayGoodbyeAudio.play();
    
    // Reload after audio finishes
    sayGoodbyeAudio.addEventListener('ended', function() {
      location.reload();
    }, { once: true });
  } else {
    location.reload();
  }
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