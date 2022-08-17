const msgEl = document.getElementById('msg');
const playBtn = document.getElementById('play-btn');

let targetNumber;

let speechTool = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new speechTool();

playBtn.addEventListener('click', startGame);

function startGame() {
  //assign value to targetNumber and console.log it
  targetNumber = getRandomNumber();
  console.log('Number:' + '', targetNumber);

  //hide the start button
  playBtn.classList.add('hide');

  //make the msg element blank
  msgEl.innerText = '';

  recognition.start();
}

//generate random number, 1-100
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

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
  if (num === targetNumber) {
    //win
    msgEl.innerHTML = `<h2>${num} is correct. You win!</h2>
    `;
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    //too low
  } else if (num < targetNumber) {
    msgEl.innerHTML += `<div>GO HIGHER</div>
    `;
    //too high
  } else {
    msgEl.innerHTML += `<div>GO LOWER</div>
    `;
  }
}

//speak result
recognition.addEventListener('result', onSpeak);

//End speech recognition service and start it again for the next guess
recognition.addEventListener('end', () => recognition.start());
