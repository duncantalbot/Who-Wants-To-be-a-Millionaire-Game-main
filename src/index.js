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
  letsPlayAudio,
  letsPlayStartAudio,
  letsPlay2000Audio,
  letsPlay64000Audio,
  letsPlay1000000Audio,
  selectedAnswerAudio,
  correctAnswerAudio,
  correctQ1Q4Audio,
  wrongAnswerAudio,
  sayGoodbyeAudio,
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
  win1000000Audio,
  fiftyFiftyAudio,
  phoneFriendAudio,
  askAudienceAudio
} from "./audio.js";

// ==== Get Buttons ===== //
import {
  letsPlayBtn,
  revealAnswerBtn,
  nextQuestionBtn,
  newGameBtn,
  walkAwayBtn
} from "./button.js";

// ==== Get Games State Functions ==== //
import {
  startGame,
  skipIntro,
  startQuestion,
  endGame
} from "./gameState.js";

// ==== Get Answer Functions ==== //
import {
  revealAnswer,
  handleNextQuestion,
  handleNewGame,
  handleWalkAway
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


// ==== Initialize boolean for audio control (always enabled) ==== //
localStorage.setItem('playAudio', JSON.stringify(true));

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
      d.classList.remove('bg-orange-500', 'border-orange-500');
      d.classList.add('bg-gray-500', 'border-gray-500');
    });
    
    // Add active styling to clicked dot
    dot.classList.remove('bg-gray-500', 'border-gray-500');
    dot.classList.add('bg-orange-500', 'border-orange-500');
    
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

// ======================================================== //
// === Skip intro when user clicks Skip Intro button ===== //
// ====================================================== //
const skipIntroBtn = document.getElementById("skip-intro-btn");
if (skipIntroBtn) {
  skipIntroBtn.addEventListener("click", skipIntro);
}

// ======================================================== //
// === Start question when user clicks Start button ====== //
// ====================================================== //
const startQuestionBtn = document.getElementById("start-question-btn");
if (startQuestionBtn) {
  startQuestionBtn.addEventListener("click", startQuestion);
}


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
walkAwayBtn.addEventListener("click", handleWalkAway);
