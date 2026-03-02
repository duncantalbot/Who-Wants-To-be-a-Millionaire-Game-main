// ==================================================== //
// ==== This file contains all lifeline functions  === //
// ================================================== //

// ==== Audio/Sounds ==== //
import {
  phoneFriendAudio,
  askAudienceAudio
} from "./audio.js";

// ==== Track which lifelines have been used ==== //
let lifelinesUsed = {
  fiftyFifty: false,
  phoneAFriend: false,
  askAudience: false
};

// ==== Get lifeline buttons ==== //
const fiftyFiftyBtn = document.getElementById("fifty-fifty");
const phoneAFriendBtn = document.getElementById("phone-a-friend");
const askAudienceBtn = document.getElementById("ask-the-audience");

// ==== Get lifeline text indicators ==== //
const phoneText = document.getElementById("phone-text");
const audienceText = document.getElementById("audience-text");

// ========================= //
// ==== 50/50 Lifeline ==== //
// ======================= //
function useFiftyFifty() {
  if (lifelinesUsed.fiftyFifty) {
    alert("You've already used this lifeline!");
    return;
  }

  // Get current question from localStorage
  const currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
  if (!currentQuestion) return;

  const correctAnswerIndex = parseInt(currentQuestion.correct);
  const allOptions = document.getElementsByClassName("options");
  
  // Get indices of incorrect answers
  let incorrectIndices = [];
  for (let i = 0; i < allOptions.length; i++) {
    if (i !== correctAnswerIndex) {
      incorrectIndices.push(i);
    }
  }

  // Randomly select 2 incorrect answers to remove
  // Shuffle the incorrect indices
  for (let i = incorrectIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incorrectIndices[i], incorrectIndices[j]] = [incorrectIndices[j], incorrectIndices[i]];
  }

  // Remove first 2 incorrect answers
  const toRemove = incorrectIndices.slice(0, 2);
  toRemove.forEach(index => {
    allOptions[index].style.visibility = "hidden";
    allOptions[index].style.pointerEvents = "none";
  });

  // Mark as used and disable button
  lifelinesUsed.fiftyFifty = true;
  fiftyFiftyBtn.style.opacity = "0.3";
  fiftyFiftyBtn.style.pointerEvents = "none";
}

// ================================== //
// ==== Phone a Friend Lifeline ==== //
// ================================ //
function usePhoneAFriend() {
  if (lifelinesUsed.phoneAFriend) {
    return;
  }

  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  // Play phone a friend sound
  if (playAudio) {
    phoneFriendAudio.play();
  }

  // Show "Ringing..." text
  phoneText.classList.remove("hidden");

  // Mark as used and disable button
  lifelinesUsed.phoneAFriend = true;
  phoneAFriendBtn.style.opacity = "0.3";
  phoneAFriendBtn.style.pointerEvents = "none";
}

// ==================================== //
// ==== Ask the Audience Lifeline ==== //
// ================================== //
function useAskAudience() {
  if (lifelinesUsed.askAudience) {
    return;
  }

  // Get audio boolean from localStorage
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  // Play ask audience sound
  if (playAudio) {
    askAudienceAudio.play();
  }

  // Show "Polling..." text
  audienceText.classList.remove("hidden");

  // Mark as used and disable button
  lifelinesUsed.askAudience = true;
  askAudienceBtn.style.opacity = "0.3";
  askAudienceBtn.style.pointerEvents = "none";
}

// ================================ //
// ==== Reset Lifelines State ==== //
// ============================== //
function resetLifelines() {
  lifelinesUsed = {
    fiftyFifty: false,
    phoneAFriend: false,
    askAudience: false
  };

  // Reset button states
  fiftyFiftyBtn.style.opacity = "1";
  fiftyFiftyBtn.style.pointerEvents = "auto";
  phoneAFriendBtn.style.opacity = "1";
  phoneAFriendBtn.style.pointerEvents = "auto";
  askAudienceBtn.style.opacity = "1";
  askAudienceBtn.style.pointerEvents = "auto";

  // Hide lifeline text indicators
  phoneText.classList.add("hidden");
  audienceText.classList.add("hidden");

  // Restore all options visibility
  const allOptions = document.getElementsByClassName("options");
  for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].style.visibility = "visible";
    allOptions[i].style.pointerEvents = "auto";
  }
}

// ===================================== //
// ==== Clear Lifeline Text Indicators ==== //
// =================================== //
function clearLifelineText() {
  if (phoneText) phoneText.classList.add("hidden");
  if (audienceText) audienceText.classList.add("hidden");
}

export {
  useFiftyFifty,
  usePhoneAFriend,
  useAskAudience,
  resetLifelines,
  clearLifelineText,
  fiftyFiftyBtn,
  phoneAFriendBtn,
  askAudienceBtn
};
