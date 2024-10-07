document.addEventListener("DOMContentLoaded", function () {
  /**
   * Define global variables
   * @const {Array} choices - Possible game choices: rock, paper, scissors, lizard, spock.
   * @let {number} userScore - Tracks the user’s score.
   * @let {number} computerScore - Tracks the computer’s score.
   * @let {string} userChoice - Tracks the user’s current choice.
   * @let {number} roundCount - Tracks the number of rounds played.
   * @const {number} maxRounds - Maximum number of rounds per game.
   */
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  let userScore = 0;
  let computerScore = 0;
  let userChoice = "";
  let roundCount = 0;
  const maxRounds = 5;

  /**
   * Get references to HTML elements: modal, buttons, and displays.
   */
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("how-to-btn");
  const span = document.getElementsByClassName("close")[0];
  const userChoiceDisplay = document.getElementById("user-choice");
  const computerChoiceDisplay = document.getElementById("computer-choice");
  const resultDisplay = document.getElementById("result");
  const userScoreDisplay = document.getElementById("user-score");
  const computerScoreDisplay = document.getElementById("computer-score");
  const playButton = document.getElementById("play-button");
  const resetButton = document.getElementById("reset-button");

  /**
   * Create a display element for the round count and insert it into the game area.
   */
  const roundDisplay = document.createElement("p");
  roundDisplay.textContent = `Round: 0/${maxRounds}`;
  const gameArea = document.querySelector(".results");
  gameArea.insertBefore(roundDisplay, resultDisplay);

  /**
   * Modal event listeners: open and close the "how-to-play" modal.
   */
  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  /**
   * Track the user's selected choice from the available options.
   */
  const buttons = document.getElementsByClassName("choice");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      userChoice = this.getAttribute("data-choice");
      userChoiceDisplay.textContent = `Your Choice: ${capitalize(userChoice)}`;
    });
  }

  /**
   * Play button functionality: trigger a new round when clicked.
   */
  playButton.addEventListener("click", playRound);

  /**
   * Function to play a round.
   * Checks if the user has made a selection, plays the round, updates scores,
   * and determines if the game is over after the max number of rounds.
   */
  function playRound() {
    if (userChoice === "") {
      resultDisplay.textContent = "Please make a selection before clicking Play!";
      return;
    }

    if (roundCount >= maxRounds) {
      resultDisplay.textContent = "The game is over! Please reset the game to play again.";
      return;
    }

    playGame(userChoice);

    roundCount++;
    roundDisplay.textContent = `Round: ${roundCount}/${maxRounds}`;

    if (roundCount === maxRounds) {
      declareOverallWinner();
    }
  }

  /**
   * Function to execute game logic for a single round.
   * Updates the UI and scores based on the user's and computer's choices.
   * @param {string} userChoice - The user's selected choice.
   */
  function playGame(userChoice) {
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    computerChoiceDisplay.textContent = `Computer's Choice: ${capitalize(computerChoice)}`;
    resultDisplay.textContent = `Result: ${winner}`;

    if (winner === "You win!") {
      userScore++;
    } else if (winner === "You lost!") {
      computerScore++;
    }

    userScoreDisplay.textContent = `User Score: ${userScore}`;
    computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
  }

  /**
   * Function to get a random computer choice.
   * @returns {string} The randomly selected choice for the computer.
   */
  function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  /**
   * Function to determine the winner based on user and computer choices.
   * @param {string} userChoice - The user's selected choice.
   * @param {string} computerChoice - The computer's selected choice.
   * @returns {string} The result of the round ("You win!", "You lost!", or "It's a tie!").
   */
  function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return "It's a tie!";
    }

    const winConditions = {
      rock: ["scissors", "lizard"],
      paper: ["rock", "spock"],
      scissors: ["paper", "lizard"],
      lizard: ["spock", "paper"],
      spock: ["scissors", "rock"]
    };

    if (winConditions[userChoice].includes(computerChoice)) {
      return "You win!";
    } else {
      return "You lost!";
    }
  }

  /**
   * Function to declare the overall winner after 5 rounds.
   * Updates the resultDisplay with the final result and changes the Play button to Reset.
   */
  function declareOverallWinner() {
    let finalMessage = "";
    if (userScore > computerScore) {
      finalMessage = `You won the game with a score of ${userScore} over ${computerScore}! 🎉`;
    } else if (userScore < computerScore) {
      finalMessage = `You Lost, the computer won the game with a score of ${computerScore} over your ${userScore}. 😔`;
    } else {
      finalMessage = `It's a tie with a score of ${userScore} and ${computerScore}. 🤝`;
    }

    resultDisplay.textContent = `Game Over! ${finalMessage}`;
    playButton.textContent = "Reset Game";
    playButton.removeEventListener("click", playRound);
    playButton.addEventListener("click", resetGame);
  }

  /**
   * Function to reset the game.
   * Resets all scores, rounds, and choices, and re-enables the Play button functionality.
   */
  function resetGame() {
    userScore = 0;
    computerScore = 0;
    roundCount = 0;
    userChoice = "";

    userChoiceDisplay.textContent = "Your Choice: ";
    computerChoiceDisplay.textContent = "Computer's Choice: ";
    resultDisplay.textContent = "Result: ";
    userScoreDisplay.textContent = "User Score: 0";
    computerScoreDisplay.textContent = "Computer Score: 0";
    roundDisplay.textContent = `Round: 0/${maxRounds}`;

    playButton.textContent = "Play!";
    playButton.removeEventListener("click", resetGame);
    playButton.addEventListener("click", playRound);
  }

  /**
   * Event listener for the reset button (if available).
   */
  if (resetButton) {
    resetButton.addEventListener("click", resetGame);
  }

  /**
   * Function to capitalize the first letter of a word.
   * @param {string} word - The word to capitalize.
   * @returns {string} The word with the first letter capitalized.
   */
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
