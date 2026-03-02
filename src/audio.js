// ==================================================== //
// ==== All audio fields are obtained in this file === //
// ================================================= //


// ========================= //
// ==== Get All Audios ==== //
// ======================= //
const letsPlayAudio = document.getElementById("lets-play-audio");
const selectedAnswerAudio = document.getElementById("selected-answer-audio");
const correctAnswerAudio = document.getElementById("correct-answer-audio");
const wrongAnswerAudio = document.getElementById("wrong-answer-audio");
// Phone and audience audio removed - lifelines now silent
const phoneFriendAudio = null;
const askAudienceAudio = null;


export {
  letsPlayAudio,
  selectedAnswerAudio,
  correctAnswerAudio,
  wrongAnswerAudio,
  phoneFriendAudio,
  askAudienceAudio
}