let _startButton = document.querySelector("#start-game");
let _alphabet = document.querySelector("#alphabet-string");
let _word = document.querySelector("#word");
let _timer = document.querySelector("#timer");
let _status = document.querySelector("#status");
let _scoreboard = document.querySelector("#scoreboard");

let alphabet = "abcdefghijklmnopqrstuvwxyz";
let wordArray = ["computer", "jelly", "boogie"];
let activeWord;
let hiddenWord;
let timer = 40;
let isPlaying = false;

_startButton.addEventListener("click", () => {
    if(!isPlaying){
        startUp();
        startTimer();
    }
})

document.querySelector("body").addEventListener("keypress", (event) => {
    if(alphabet.includes(event.key)){
        checkLetter(event.key);
    } else if (!(alphabet.includes(event.key))) {
        alert("You've already guessed that one!");
    }
    else {
        alert("Please press a valid key!")
    }
})

function startUp() {
    isPlaying = true;
    activeWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    hiddenWord = new Array(activeWord.length);
    hiddenWord.fill("_");
    alphabet = "abcdefghijklmnopqrstuvwxyz";
    _alphabet.textContent = alphabet;
    _word.textContent = hiddenWord.join("");
}

function checkLetter(keyPressed) {
    alphabet = alphabet.replace(keyPressed, "");
    _alphabet.textContent = alphabet;

    if(activeWord.includes(keyPressed)){
        for(let i = 0; i < activeWord.length; i++) {
            if(activeWord.charAt(i) === keyPressed){
                hiddenWord[i] = keyPressed;
            }
        }
        _word.textContent = hiddenWord.join("");
    } else {
        timer -= 5;
        if(timer > 0){
            _timer.textContent = timer;
        } else {
            timer = 0;
            _timer.textContent = timer;
            isPlaying = false;
        }
    }
    if(hiddenWord.join("") === activeWord){
        gameOver("win");
    }
}

function startTimer() {
    if(timer != 40){
        timer = 40;
    }
    _timer.textContent = timer;

    let countdown = setInterval(() => {
        if(timer > 0){
            timer--;
            _timer.textContent = timer;
        }
        else if(timer === 0 && isPlaying === true){
            clearInterval(countdown);
            gameOver();
            return;
        } else {
            clearInterval(countdown);
        }
    }, "1000");
}

function gameOver(gameStatus) {
    isPlaying = false;
    if(gameStatus === undefined){
        alert("You lose :(");
    } else {
        alert("You win!");
    }
    timer = 0;
    _timer.textContent = timer;
}

//Start the game by clicking a button
//Initialize the game by getting a word and creating an array filled with underscores,
//show all alphabet letters, reset timer and start countdown

//On user key press, get key pressed.
//   For every letter in the string, loop over the letters and check to see if they match
//   Check every letter in the string and remove from the alphabet
//      If the letter matches
//          update the displayed word
//          checkWord()
//      Else if it doesn't
//          Flash the alphabet box red
//          subtract 10 seconds from timer
//          checkWord()


// checkWord ()
// if timer <= 0
//      gameOver(you lose!)
// else if all letters are filled in
//      gameOver(you win!)