var myAudio = document.getElementById("player");
var isPlaying = false;
var hintvalue = "";
let quizNumber = 0;
let faceNumber = 5;
const smileyArray = [
  "face0.png",
  "face1.png",
  "face2.png",
  "face3.png",
  "face4.png",
  "face5.png",
  "face6.png",
  "face7.png",
  "face8.png",
  "face9.png"
];

const quiz = [
  {
    question: "How are you?",
    answer: "fine",
    hints: ["good", "better", "cool"],
    wrongAttempt: 0,
    hintNumber: 0
  },
  {
    question: "Sun rises in East and sets in",
    answer: "west",
    hints: ["direction", "opposite to east"],
    wrongAttempt: 0,
    hintNumber: 0
  }
];

function showInstruction() {
  document.getElementById("instruction-screen").style.display = "block";
  document.getElementsByClassName("title-screen")[0].style.display = "none";
}

function togglePlay() {
  if (isPlaying) {
    myAudio.pause();
    document.getElementById("music_img").src = "music_off.png";
  } else {
    myAudio.play();
    document.getElementById("music_img").src = "music_on.png";
  }
}
myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

function showGameScreen() {
  document.getElementById("instruction-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  document.getElementById("question").innerHTML = quiz[quizNumber].question;
  document.getElementById("answerfield").innerText = quiz[quizNumber].answer
    .split("")
    .map(x => "*")
    .join("");
  updateSmiley();
}

function updateSmiley() {
  document.getElementById("faceNumber").src = smileyArray[faceNumber];
}

function checkHint() {
  const hintNumber = quiz[quizNumber].hintNumber;
  document.getElementById("hint-text").value =
    quiz[quizNumber].hints[hintNumber];
  quiz[quizNumber].hintNumber++;
  if (quiz[quizNumber].hintNumber === quiz[quizNumber].hints.length) {
    document.getElementById("hint-button").disabled = true;
  }
}

function handleKeyClick(e) {
  answerelem = document.getElementById("answerfield");
  const answer = quiz[quizNumber].answer;
  const key = e.innerText.toLowerCase();
  if (answer.includes(key)) {
    const index = answer.indexOf(key);
    let string = answerelem.innerText.split("");
    string[index] = key;
    answerelem.innerText = string.join("");
    faceNumber++;
  } else {
    faceNumber--;
    document.getElementById("smiley-group").getElementsByTagName("img")[
      quiz[quizNumber].wrongAttempt
    ].src = "life_icon.png";
    quiz[quizNumber].wrongAttempt++;
  }
  if (quiz[quizNumber].wrongAttempt == 5) {
    document.getElementById("next-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("result").innerHTML = "Fail";
    document.getElementById("face-expression").src = "face0.png";
  }
  if (
    document.getElementById("answerfield").innerHTML == quiz[quizNumber].answer
  ) {
    document.getElementById("next-screen").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("result").innerHTML = "Success";
    document.getElementById("face-expression").src = "face9.png";
  }
  updateSmiley();
  e.innerHTML = "_";
  e.disabled = true;
}

function resetKeypad(){
    let keyArray=document.getElementsByClassName("keypad-button");
    for(a of keyArray){
        a.innerText=a.id;
        a.disabled=false;
    }
}

function nextQuestion() {
  quizNumber++;
  faceNumber=5;
  document.getElementById("game-screen").style.display = "block";
  document.getElementById("next-screen").style.display = "none";
  resetKeypad();
  loadQuestion();

}

