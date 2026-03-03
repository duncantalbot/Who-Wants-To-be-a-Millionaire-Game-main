// ======================================================== //
// =============== PSEUDOCODE FOR THE GAME =============== //

//1. First get json data from the URL using fetch API
//2. Combine all the question sets into one array
//3. Create function that randomly selects a question object from the array
//4. Create a function that will take the question object and create a question card
//5. Create a function that will take the question card and display it on the page

// ===================================================== //


// ==== Get Audios/Sounds ==== //
import {
  letsPlayAudio
} from "./audio.js";

// ==== Get Buttons ===== //
import {
  letsPlayBtn,
  audioBtnControl,
  revealAnswerBtn,
  nextQuestionBtn,
  newGameBtn
} from "./button.js";

// ==== Get Games State Functions ==== //
import {
  startGame,
  endGame
} from "./gameState.js";

// ==== Get Answer Functions ==== //
import {
  revealAnswer,
  handleNextQuestion,
  handleNewGame
} from "./answer.js";

// ==== Get Lifeline Functions ==== //
import {
  useFiftyFifty,
  usePhoneAFriend,
  useAskAudience,
  fiftyFiftyBtn,
  phoneAFriendBtn,
  askAudienceBtn
} from "./lifeline.js";


// ==== Initialize boolean for audio control ==== //
let playAudio = true;
localStorage.setItem('playAudio', JSON.stringify(playAudio));

// ==== Initialize selected game index (default to 0) ==== //
let selectedGameIndex = 0;
localStorage.setItem('selectedGameIndex', selectedGameIndex.toString());

// ==== Handle Game Selector Dots ==== //
const gameDots = document.querySelectorAll('.game-dot');
gameDots.forEach((dot, index) => {
  dot.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering parent clicks
    
    // Remove active styling from all dots
    gameDots.forEach(d => {
      d.classList.remove('bg-orange', 'border-orange');
      d.classList.add('bg-gray-400', 'border-gray-400');
    });
    
    // Add active styling to clicked dot
    dot.classList.remove('bg-gray-400', 'border-gray-400');
    dot.classList.add('bg-orange', 'border-orange');
    
    // Store selected game index
    selectedGameIndex = parseInt(dot.dataset.game);
    localStorage.setItem('selectedGameIndex', selectedGameIndex.toString());
    console.log(`Game ${selectedGameIndex + 1} selected`);
  });
});

// ======================================================== //
// === Start game when user clicks [Let's Play] button === //
// ====================================================== //
letsPlayBtn.addEventListener("click", startGame);


// ======================== //
// ==== Control Audio ==== //
// ====================== //
let mute = document.querySelector(".mute");
let unmute = document.querySelector(".unmute");

audioBtnControl.addEventListener("click", () => {
  // ==== Get audio boolean from localStorage ==== //
  playAudio = JSON.parse(localStorage.getItem('playAudio'));
  
  // ==== Toggle/Revert/Change audio boolean ==== //
  playAudio = !playAudio

  // ==== Save toggled/reverted/changed audio boolean to localStorage ==== //
  localStorage.setItem('playAudio', JSON.stringify(playAudio));

  if (playAudio) {
    letsPlayAudio.play();
    unmute.classList.add("hidden");
    mute.classList.remove("hidden");
  } else {
    letsPlayAudio.pause();
    unmute.classList.remove("hidden");
    mute.classList.add("hidden");
  }
});


// =============================== //
// ==== Lifeline Event Listeners ==== //
// ============================= //
fiftyFiftyBtn.addEventListener("click", useFiftyFifty);
phoneAFriendBtn.addEventListener("click", usePhoneAFriend);
askAudienceBtn.addEventListener("click", useAskAudience);


// ======================================== //
// ==== Game Control Event Listeners ==== //
// ====================================== //
revealAnswerBtn.addEventListener("click", revealAnswer);
nextQuestionBtn.addEventListener("click", handleNextQuestion);
newGameBtn.addEventListener("click", handleNewGame);
