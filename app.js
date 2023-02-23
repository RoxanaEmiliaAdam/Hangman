"use strict";

// select elements
const startBtn = document.querySelector(".start_game");
const newGameBtn = document.querySelector(".new_game");
let nrGuesses = document.querySelector(".number_of_guesses");
const incorrectGuesses = document.querySelector(".incorrect");
const characters = document.querySelector(".letters");
const message = document.querySelector(".message");

// declare global variables

let lives, incorrectLetters, hiddenCharacters, guess;
let keyValue, i;

// CALLBACK functions

const displayMessage = function (text) {
  message.textContent = text;
};

// setting up first conditions and calling the function
const init = function () {
  document.getElementById("guess").value = "";
  incorrectLetters = [];
  incorrectGuesses.textContent = "";
  hiddenCharacters = "";
  characters.textContent = "";
  lives = 5;
  nrGuesses.textContent = `${lives} of 5`;

  displayMessage("Let's start the game!");
  startBtn.disabled = false;
  message.classList.remove("win");
  message.classList.remove("loose");
};
init();

const createStartBtn = function () {
  guess = document.getElementById("guess").value.toUpperCase().split("");
  console.log(guess);

  // create underline characters for unknown word
  hiddenCharacters = guess.map((letter) => "_");

  characters.textContent = hiddenCharacters.join(" ");

  // USER Key Event
  document.addEventListener("keydown", replaceCharacters);
};

// save the incorrect letters to an array and display them
const displayIncorrectGuesses = function (value) {
  incorrectLetters.push(value);
  incorrectGuesses.textContent = incorrectLetters.sort().join(", ");
};

const displayCorrectGuess = function () {
  if (lives >= 1) {
    hiddenCharacters[i] = keyValue;
    displayMessage("Keep Playing...");
    if (guess.join("") === hiddenCharacters.join("")) {
      displayMessage(`You Won! Correct word is "${guess.join("")}"`);
      message.classList.add("win");
      startBtn.disabled = true;
    }
  }
};

const displayWrongGuess = function () {
  if (lives > 1) {
    lives--;
    displayMessage("Wrong Guess!");
    displayIncorrectGuesses(keyValue);
    nrGuesses.textContent = `${lives} of 5`;
  } else {
    displayMessage(`Game Over! Correct word is "${guess.join("")}"`);
    displayIncorrectGuesses(keyValue);
    nrGuesses.textContent = 0;
    startBtn.disabled = true;
    message.classList.add("loose");
  }
};

// replace hiddencharacters with keyvalues and update wrong guesses
const replaceCharacters = function (e) {
  keyValue = e.key.toUpperCase();

  // check if keyvalue matches any letter

  if (guess.includes(keyValue)) {
    for (i = 0; i < guess.length; i++) {
      // user input is correct
      if (guess[i] === keyValue) {
        displayCorrectGuess();
      }
    }
    characters.textContent = hiddenCharacters.join(" ");

    // user input is wrong
  } else {
    displayWrongGuess();
  }
};

// START button

startBtn.addEventListener("click", createStartBtn);

// NEW GAME button

newGameBtn.addEventListener("click", init);
