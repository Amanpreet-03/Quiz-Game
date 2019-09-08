var myAudio = document.getElementById('player');
var isPlaying = false;
var hintvalue=""
let quizNumber =0;
let faceNumber =5;
const smileyArray = ["face0.png", "face1.png", "face2.png", "face3.png", "face4.png", "face5.png", "face6.png", "face7.png", "face8.png", "face9.png" ];

const quiz = [
    {
        question: "how are you ?",
        answer: "fine",
        hints: ["good", "better", "cool"],
        wrongAttempt: 0,
        hintNumber: 0
    },
    {
        question: "Sun rises in the?",
        answer: "east",
        hints: ["direction", "opposite to west"],
        wrongAttempt: 0,
        hintNumber: 0 
    }
]

function showInstruction(){
    document.getElementById('instruction-screen').style.display="block";
    document.getElementsByClassName('title-screen')[0].style.display="none";
}

function togglePlay() {
    if (isPlaying) {
      myAudio.pause();
      document.getElementById('music_img').src="music_off.png";
    } else {
      myAudio.play();
      document.getElementById('music_img').src="music_on.png";
    }
  };
  myAudio.onplaying = function() {
    isPlaying = true;
  };
  myAudio.onpause = function() {
    isPlaying = false;
  };
  
  function showGameScreen(){

    document.getElementById('instruction-screen').style.display="none";
    document.getElementById('game-screen').style.display="block";
    document.getElementById("question").innerHTML=quiz[quizNumber].question; 
    document.getElementById('answerfield').innerText = quiz[quizNumber].answer.split('').map(x => '*').join('');
    updateSmiley();
  }

  function reset() {
      quizNumber = 0;
      faceNumber = 5;
  }

  function updateSmiley() {
    document.getElementById('faceNumber').src = smileyArray[faceNumber];
    
    // for(let i = 0; i < quiz[quizNumber].wrongAttempt; i++){
    //     document.getElementById('smiley-group').getElementsByTagName('img')[i].src ="life_icon.png"
    // }
  }

  
  function checkHint(){
    const hintNumber=quiz[quizNumber].hintNumber;
    document.getElementById("hint-text").value=quiz[quizNumber].hints[hintNumber]; 
    quiz[quizNumber].hintNumber++;
    if(quiz[quizNumber].hintNumber === quiz[quizNumber].hints.length){
        document.getElementById('hint-button').disabled = true;
    }

    // let hintsLength = (quiz[0].hints).length;
    // var i=0;
    // if(i<hintsLength){
    //     hintvalue=hintvalue+(quiz[0].hints)[i];
    //     i++;
    // }



    //   let hintsLength = (quiz[0].hints).length;
    //   console.log(hintsLength);
    // //   console.log("qhints", qhints);
    // let i=0;
    // while(i<hintsLength){
    //     document.getElementById("hint-text").value=quiz[0].hints[i]; 
    //     i++;
    // }
    // // for(let i=0; i<hintsLength; i++){
    // //     document.getElementById("hint-text").value=quiz[0].hints[i]; 
    // // }
  }

function pressedKey(e){
    console.log(e);
    // console.log(document.getElementById("input-text").value);
    // let letter= document.getElementById("input-text").value;
    // if(letter!==""){
    //     if((quiz[0].answer).includes(letter)){
    //         console.log("yes");
    //     } else {
    //         console.log("no");
    //     }
    // }
    // letter="";sdsd
    
}

  

function handleKeyClick(e){
    answerelem = document.getElementById('answerfield');
    const answer = quiz[quizNumber].answer;
    const key = e.innerText.toLowerCase();
    if(answer.includes(key)){   
        const index = answer.indexOf(key);
        let string = answerelem.innerText.split('');
        string[index]=key;
        answerelem.innerText = string.join("");
        faceNumber++;
    } else {
        faceNumber--;
        document.getElementById('smiley-group').getElementsByTagName('img')[quiz[quizNumber].wrongAttempt].src ="life_icon.png"
        quiz[quizNumber].wrongAttempt ++;
        // document.getElementById("life1").src="life_icon.png";
    }
    updateSmiley();
    e.innerHTML = '_';
    e.disabled = true;
}