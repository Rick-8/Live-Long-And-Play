document.addEventListener("DOMContentLoaded", function () {
  /* Define global variables */
  const choices = ["rock", "paper", "scissors", "lizard", "spock"];
  let userScore = 0;
  let computerScore = 0;
  let userChoice = ""; // Track the user's current choice

  /* Get references to HTML elements */
  const userChoiceDisplay = document.getElementById("user-choice");
  const computerChoiceDisplay = document.getElementById("computer-choice");
  const resultDisplay = document.getElementById("result");
  const userScoreDisplay = document.getElementById("user-score");
  const computerScoreDisplay = document.getElementById("computer-score");

  /* Get the modal elements */
  const modal = document.getElementById("myModal");
  const btn = document.getElementById("how-to-btn");
  const span = document.getElementsByClassName("close")[0];

  /* Open modal */
  btn.onclick = function() {
      modal.style.display = "block";
  };

  /* Close modal when clicking on <span> */
  span.onclick = function() {
      modal.style.display = "none";
  };

  /* Close modal when clicking outside of it */
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  };

  /* Track which option the user clicked */
  const buttons = document.getElementsByClassName("choice");
  for (let button of buttons) {
      button.addEventListener("click", function () {
          userChoice = this.getAttribute("data-choice");
          userChoiceDisplay.textContent = `Your Choice: ${capitalize(userChoice)}`;
      });
  }

  /* "Play!" button functionality */
  document.getElementById("play-button").addEventListener("click", function () {
      if (userChoice === "") {
          alert("Please make a selection before clicking Play!");
          return;
      }
      playGame(userChoice);
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

  /* Function to determine the winner */
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

  /* Function to capitalize the first letter */
  function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
  }
});
