// ==================================================== //
// ==== This file contains all lifeline functions  === //
// ================================================== //

// ==== Import lifeline audio ==== //
import {
  fiftyFiftyAudio,
  phoneFriendAudio,
  askAudienceAudio,
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
  question1000000Audio
} from "./audio.js";

// ==== Function to stop all background audio ==== //
function stopBackgroundAudio() {
  const backgroundAudios = [
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
    question1000000Audio
  ];
  
  backgroundAudios.forEach(audio => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
}

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
  
  // Stop background audio and play 50-50 audio (looped)
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  if (playAudio && fiftyFiftyAudio) {
    stopBackgroundAudio();
    fiftyFiftyAudio.currentTime = 0;
    fiftyFiftyAudio.play();
  }

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

  // Show "Ringing..." text
  phoneText.classList.remove("hidden");
  
  // Stop background audio and play Phone-A-Friend audio (looped)
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  if (playAudio && phoneFriendAudio) {
    stopBackgroundAudio();
    phoneFriendAudio.currentTime = 0;
    phoneFriendAudio.play();
  }

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

  // Show "Polling..." text
  audienceText.classList.remove("hidden");
  
  // Stop background audio and play Ask The Audience audio (looped)
  let playAudio = JSON.parse(localStorage.getItem('playAudio'));
  if (playAudio && askAudienceAudio) {
    stopBackgroundAudio();
    askAudienceAudio.currentTime = 0;
    askAudienceAudio.play();
  }

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
