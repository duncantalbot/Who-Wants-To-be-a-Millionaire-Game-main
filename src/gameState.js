// ====================================================== //
// ==== This file contains all game state functions  === //
// ==================================================== //

// ==== Audios/Sounds ==== //
import {
  letsPlayStartAudio,
  letsPlayAudio,
} from "./audio.js";

// ==== Pages/Sections ==== //
import {
  welcomeSection,
  questionSection,
  moneyLadderContainer
} from "./page.js";

// ==== Buttons ==== //
import {
  letsPlayBtn
} from "./button.js";

// ==== Question Function ==== //
import {
  displayNextQuestion
} from "./question.js";

// ==== Lifeline Functions ==== //
import {
  resetLifelines
} from "./lifeline.js";



// ============================== //
// ==== Start Game Function ==== //
// ============================ //
function startGame() {
  // console.log("🚀 ~ startGame is starting", startGame);
  
  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  // Play Let's Play Start audio
  if (playAudio) {
    letsPlayStartAudio.play();
  }
  
  welcomeSection.classList.replace("h-screen", "h-0");
  letsPlayBtn.style.display = "none";
  questionSection.style.display = "flex";
  
  // Hide game selector dots when game starts
  const gameSelectorDots = document.getElementById("game-selector-dots");
  if (gameSelectorDots) {
    gameSelectorDots.style.display = "none";
  }
  
  // Hide money ladder container (which contains everything) initially - show after Let's Play Start audio finishes
  moneyLadderContainer.classList.add("hidden");
  
  resetLifelines();
  // Initialize question counter
  localStorage.setItem('questionNumber', '1');
  updateMoneyLadder(1);
  
  // Wait for Let's Play Start audio to finish before showing first question
  if (playAudio) {
    letsPlayStartAudio.addEventListener('ended', function() {
      moneyLadderContainer.classList.remove("hidden");
      displayNextQuestion();
    }, { once: true }); // Use once: true to auto-remove listener
  } else {
    // If audio is muted, show question immediately
    moneyLadderContainer.classList.remove("hidden");
    displayNextQuestion();
  }
}

// ============================ //
// ==== End Game Function ==== //
// ========================== //
function endGame() {
  console.log("🚀 ~ endGame is running", endGame);
  // console.log("The game is over");
}

// =============================== //
// ==== Reset State Function ==== //
// ============================= //
function resetState() {
  // ==== Clear options ==== //
  let options = document.getElementsByClassName("options");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("selected-answer");
    options[i].classList.remove("correct-answer");
    options[i].classList.remove("wrong-answer");
    options[i].classList.remove("hidden");
    options[i].classList.add("options");
    // Restore visibility (in case 50/50 was used)
    options[i].style.visibility = "visible";
    options[i].style.pointerEvents = "auto";
  }
  
  // Hide game control buttons
  const revealBtn = document.getElementById("reveal-answer-btn");
  const nextBtn = document.getElementById("next-question-btn");
  const newGameButtonElem = document.getElementById("new-game-btn");
  if (revealBtn) revealBtn.classList.add("hidden");
  if (nextBtn) nextBtn.classList.add("hidden");
  if (newGameButtonElem) newGameButtonElem.classList.add("hidden");
}

// ===================================== //
// ==== Update Money Ladder Display ==== //
// ===================================== //
function updateMoneyLadder(questionNumber) {
  // Get all money list items
  const moneyItems = document.querySelectorAll('.text-orange li');
  
  // Safety check - if no items found, exit
  if (!moneyItems || moneyItems.length === 0) {
    return;
  }
  
  // Remove money-active class from all items
  moneyItems.forEach(item => {
    if (item && item.classList) {
      item.classList.remove('money-active');
    }
  });
  
  // Add money-active to current question (list is reversed, so 15-questionNumber)
  // Question 1 = index 14, Question 2 = index 13, etc.
  if (questionNumber >= 1 && questionNumber <= 15) {
    const activeIndex = 15 - questionNumber;
    if (moneyItems[activeIndex] && moneyItems[activeIndex].classList) {
      moneyItems[activeIndex].classList.add('money-active');
    }
  }
}

// ======================================== //
// ==== Increment Question Counter ==== //
// ====================================== //
function nextQuestion() {
  let questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
  questionNumber++;
  
  if (questionNumber > 15) {
    // Player won the game!
    console.log("🎉 Congratulations! You've won the game!");
    // Could add a win screen here
    return false;
  }
  
  localStorage.setItem('questionNumber', questionNumber.toString());
  updateMoneyLadder(questionNumber);
  return true;
}

export {
  startGame,
  endGame,
  resetState,
  updateMoneyLadder,
  nextQuestion
}