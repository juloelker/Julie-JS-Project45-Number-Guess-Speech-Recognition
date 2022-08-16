const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:' + '', randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start recognition and game
recognition.start();

//Capture user speaking
function onSpeak(e) {
  //drill into the results object, result again (index 0 2x) to get to the transcript property
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

//write what the user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `<div>You said:</div>
  <span class="box">${msg}</span>`;
}

//check the msg against the number
function checkNumber(msg) {
  const num = +msg;
  //check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div> That is not a valid number.</div>`;
    return;
  }

  //check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div> The number must be between 1 and 100.</div>`;
    return;
  }

  //Check the number
  //win
  if (num === randomNum) {
    msgEl.innerHTML = `<h2>${num} is correct. You win!</h2>
  <button class="play-again" id="play-again">Play Again</button>`; //too low
  } else if (num < randomNum) {
    msgEl.innerHTML += `<div>GO HIGHER</div>
    `; //too high
  } else {
    msgEl.innerHTML += `<div>GO LOWER</div>
    `;
  }
}

//generate random number, 1-100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener('result', onSpeak);

//End speech recognition service and start it again for the next guess
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload();
  }
});
/*
*## Project Spec(ifications

- Display UI directing user to speak guess x
- Implement speech recognition to listen to mic
- Process user's guess and match
- Let user know higher, lower, match or not a number
*/
