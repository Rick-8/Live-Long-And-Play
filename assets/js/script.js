document.addEventListener("DOMContentLoaded", function () {
  /* Define global variables */
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  let userScore = 0;
  let computerScore = 0;
  let userChoice = ""; /* Track the user's current choice */
  let roundCount = 0;  /* Track the number of rounds played */
  const maxRounds = 5; /* Maximum number of rounds */

  /* Get references to HTML elements */
  const userChoiceDisplay = document.getElementById("user-choice");
  const computerChoiceDisplay = document.getElementById("computer-choice");
  const resultDisplay = document.getElementById("result");
  const userScoreDisplay = document.getElementById("user-score");
  const computerScoreDisplay = document.getElementById("computer-score");
  const roundDisplay = document.createElement("p");
  const playButton = document.getElementById("play-button");

  /* Append the round display to the results section */
  const gameArea = document.querySelector(".results");
  roundDisplay.textContent = `Round: 0/${maxRounds}`;
  gameArea.insertBefore(roundDisplay, resultDisplay);

  /* Track which option the user clicked */
  const buttons = document.getElementsByClassName("choice");
  for (let button of buttons) {
      button.addEventListener("click", function () {
          userChoice = this.getAttribute("data-choice");
          userChoiceDisplay.textContent = `Your Choice: ${capitalize(userChoice)}`;
      });
  }

  /* "Play!" button functionality */
  playButton.addEventListener("click", function () {
      if (userChoice === "") {
          alert("Please make a selection before clicking Play!");
          return;
      }

      /* Check if the game has reached the maximum number of rounds */
      if (roundCount >= maxRounds) {
          alert("The game is over! Please reset the game to play again.");
          return;
      }

      playGame(userChoice);

      /* Increment the round count and update the display */
      roundCount++;
      roundDisplay.textContent = `Round: ${roundCount}/${maxRounds}`;

      /* Check if maximum rounds reached to determine the overall winner */
      if (roundCount === maxRounds) {
          declareOverallWinner();
      }
  });

  /* Function to play a round */
  function playGame(userChoice) {
      const computerChoice = getComputerChoice();
      const winner = determineWinner(userChoice, computerChoice);

      /* Update the UI */
      computerChoiceDisplay.textContent = `Computer's Choice: ${capitalize(computerChoice)}`;
      resultDisplay.textContent = `Result: ${winner}`;

      /* Update the scores */
      if (winner === "You win!") {
          userScore++;
      } else if (winner === "You lose!") {
          computerScore++;
      }

      /* Display updated scores */
      userScoreDisplay.textContent = `User Score: ${userScore}`;
      computerScoreDisplay.textContent = `Computer Score: ${computerScore}`;
  }

  /* Function to get a random computer choice */
  function getComputerChoice() {
      return choices[Math.floor(Math.random() * choices.length)];
  }

  // Function to determine the winner
  function determineWinner(userChoice, computerChoice) {
      if (userChoice === computerChoice) {
          return "It's a tie!";
      }

      /* Define the winning conditions */
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
          return "You lose!";
      }
  }

  /* Function to declare the overall winner after 5 rounds */
  function declareOverallWinner() {
      let finalMessage = "";
      if (userScore > computerScore) {
          finalMessage = `You won the game with a score of ${userScore} to ${computerScore}! 🎉`;
      } else if (userScore < computerScore) {
          finalMessage = `The computer won the game with a score of ${computerScore} to ${userScore}. 😔`;
      } else {
          finalMessage = `It's a tie with a score of ${userScore} to ${computerScore}. 🤝`;
      }

      /* Show the final message */
      resultDisplay.textContent = `Game Over! ${finalMessage}`;
      playButton.textContent = "Reset Game";
      playButton.removeEventListener("click", playGame);

      /* Add reset functionality */
      playButton.addEventListener("click", resetGame);
  }

  /* Function to reset the game */
  function resetGame() {
      /* Reset scores and round counter */
      userScore = 0;
      computerScore = 0;
      roundCount = 0;
      userChoice = "";

      /* Reset display elements */
      userChoiceDisplay.textContent = "Your Choice: ";
      computerChoiceDisplay.textContent = "Computer's Choice: ";
      resultDisplay.textContent = "Result: ";
      userScoreDisplay.textContent = "User Score: 0";
      computerScoreDisplay.textContent = "Computer Score: 0";
      roundDisplay.textContent = `Round: 0/${maxRounds}`;

      /* Change button text back and re-enable play button functionality */
      playButton.textContent = "Play!";
      playButton.removeEventListener("click", resetGame);
      playButton.addEventListener("click", function () {
          if (userChoice === "") {
              alert("Please make a selection before clicking Play!");
              return;
          }

          if (roundCount < maxRounds) {
              playGame(userChoice);
              roundCount++;
              roundDisplay.textContent = `Round: ${roundCount}/${maxRounds}`;

              if (roundCount === maxRounds) {
                  declareOverallWinner();
              }
          }
      });
  }

  /* Function to capitalize the first letter */
  function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
