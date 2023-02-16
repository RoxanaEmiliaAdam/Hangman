// select elements
const startBtn = document.querySelector(".start_game");

// Start game

startBtn.addEventListener("click", function () {
  const guess = document.getElementById("guess").value.toUpperCase().split("");
  console.log(guess);

  // create underlines for unknown word
  let characters = document.querySelector(".letters");

  let hiddenCharacters = "_ ".repeat(guess.length);

  console.log(hiddenCharacters.length);
  characters.textContent = hiddenCharacters;

  // user key event
  document.addEventListener("keydown", function (e) {
    const keyValue = e.key.toUpperCase();
    console.log(`you pressed a ${keyValue}`);
    const indexValue = guess.indexOf(keyValue);
    console.log(indexValue);
    console.log(hiddenCharacters[indexValue]);

    // check if keyvalue matches any letter
    if (guess.includes(keyValue)) {
      let updateCh;
      if (hiddenCharacters[indexValue] === "_") {
        updateCh = hiddenCharacters.replace(
          hiddenCharacters[indexValue],
          keyValue
        );
      }
      if (hiddenCharacters[indexValue] === " ") {
        updateCh = hiddenCharacters.replace(hiddenCharacters[indexValue], " ");
      }
      console.log(updateCh);
    } else {
      console.log("no match");
    }
  });
});
