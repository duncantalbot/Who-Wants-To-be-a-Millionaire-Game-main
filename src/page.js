// ====================================================== //
// ==== This file contains the game state functions  === //
// ==================================================== //


// ====================================== //
// ==== Get Welcome Page/Section ======= //
// ==================================== //
const welcomeSection = document.querySelector(".welcome-container");

// ======================================= //
// ==== Get Question Page/Section ======= //
// ===================================== //
const questionSection = document.querySelector(".question-container");

// ======================================= //
// ==== Get Question Area (Q & Choices) = //
// ===================================== //
const questionArea = document.querySelector("#question-area");

// ======================================= //
// ==== Get Money Ladder Container ====== //
// ===================================== //
const moneyLadderContainer = document.querySelector("#money-ladder-container");

export {
  welcomeSection,
  questionSection,
  questionArea,
  moneyLadderContainer
}