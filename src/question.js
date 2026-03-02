// ==================================================== //
// ==== This file contains all question functions  === //
// ================================================== //

// ==== Audios/Sounds ==== //
import {
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
} from "./audio.js";

// ==== Game State Functions ==== //
import {
  resetState
} from "./gameState.js";

import {
  handleAnswer
} from "./answer.js";

// ==== Get audio boolean from localStorage ==== //
let playAudio = JSON.parse(localStorage.getItem('playAudio'));

// ==== Get question from localStorage if any exist ==== //
let currentQuestion = JSON.parse(localStorage.getItem('currentQuestion'));
let selectedGameSet = null;

// =================================================== //
// ==== This function displays the next question ==== //
// ================================================= //
async function displayNextQuestion() {
  // console.log("🚀 ~ displayNextQuestion is running", displayNextQuestion);
  resetState();
  
  // Get current question number
  const questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
  
  // Play appropriate audio based on question number
  if (playAudio) {
    // Stop all audio first
    const allAudios = [
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
    
    allAudios.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    
    // Play appropriate audio for question
    switch(questionNumber) {
      case 6:  // $2,000
        question2000Audio.play();
        break;
      case 7:  // $4,000
        question4000Audio.play();
        break;
      case 8:  // $8,000
        question8000Audio.play();
        break;
      case 9:  // $16,000
        question16000Audio.play();
        break;
      case 10: // $32,000
        question32000Audio.play();
        break;
      case 11: // $64,000
        question64000Audio.play();
        break;
      case 12: // $125,000
        question125000Audio.play();
        break;
      case 13: // $250,000
        question250000Audio.play();
        break;
      case 14: // $500,000
        question500000Audio.play();
        break;
      case 15: // $1,000,000
        question1000000Audio.play();
        break;
      default:
        letsPlayAudio.play();
    }
  }
  
  const question = await getNextQuestion();
  currentQuestion = question;
  
  // ==== Save current question to localStorage ==== //
  localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  // console.log(JSON.parse(localStorage.getItem('currentQuestion')))
  displayQuestion(currentQuestion);
}


// ============================================== //
// ==== This function displays the question ==== //
// ============================================ //
function displayQuestion(questionObject) {
  // console.log("🚀 ~ displayQuestion is running", displayQuestion);
  // console.log(currentQuestion);

  const questionCard = document.getElementById("question-card");
  questionCard.innerHTML = `<h2>${questionObject.question}</h2>`;

  const option1 = document.getElementById("option-one");
  const option2 = document.getElementById("option-two");
  const option3 = document.getElementById("option-three");
  const option4 = document.getElementById("option-four");

  option1.innerHTML = `
    <span class="text-orange font-bold mr-1">A:</span>
    <span>${questionObject.content[0]}</span>`;
  option2.innerHTML = `
    <span class="text-orange font-bold mr-1">B:</span>
    <span>${questionObject.content[1]}</span>`;
  option3.innerHTML = `
    <span class="text-orange font-bold mr-1">C:</span>
    <span>${questionObject.content[2]}</span>`;
  option4.innerHTML = `
    <span class="text-orange font-bold mr-1">D:</span>
    <span>${questionObject.content[3]}</span>`;

  // prepare options for click
  let options = document.getElementsByClassName("options");
  options = Array.from(options);
  options.forEach((option) => {
    option.addEventListener("click", handleAnswer);
  });
}


// =============================================== //
// ==== Get the next question in sequence ==== //
// ============================================ //
async function getNextQuestion() {
  const data = await getQuestions();
  const questionNumber = parseInt(localStorage.getItem('questionNumber')) || 1;
  
  // If starting a new game (question 1), pick next game set in sequence
  if (questionNumber === 1 || !selectedGameSet) {
    // Get the last used game set index from localStorage (default to -1 so first game is 0)
    const lastGameIndex = parseInt(localStorage.getItem('lastGameIndex') ?? '-1');
    
    // Move to next game set (with wrap around)
    const nextGameIndex = (lastGameIndex + 1) % data.games.length;
    
    // Store the new game index
    localStorage.setItem('lastGameIndex', nextGameIndex.toString());
    
    selectedGameSet = data.games[nextGameIndex];
    console.log(`Selected game set ${nextGameIndex + 1} of ${data.games.length}`);
  }
  
  // Get the question at the current index (questionNumber - 1 because arrays are 0-indexed)
  const questionIndex = questionNumber - 1;
  return selectedGameSet.questions[questionIndex];
}


// =================================================== //
// ==== Get questions(Get the data from the URL) ==== //
// ================================================= //
async function getQuestions() {
  const URL = "./questions.json";

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


// ===================================================== //
// ==== Merge all the question sets into one array ==== //
// =================================================== //
async function mergeQuestionSets() {
  const data = await getQuestions();
  let questions = [];
  for (let i = 0; i < data.games.length; i++) {
    questions = questions.concat(data.games[i].questions);
  }

  return questions;
}

export {
  displayNextQuestion
}