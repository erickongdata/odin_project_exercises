function computerPlay() {
  const play = ["rock", "paper", "scissors"];
  const choice = Math.floor(Math.random() * 3);
  return play[choice]; // random selection
}

function playRound(playerSelection, computerSelection) {
  // playRound returns the results of each round of play
  const player = playerSelection;
  const computer = computerSelection;
  const playerF = player.toUpperCase(); // Capitalize word
  const computerF = computer.toUpperCase(); // Capitalize word

  return (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
    ? `You win! ${playerF} beats ${computerF}.`
    : player === computer
    ? `Its a tie! You both chose ${playerF}`
    : `You lose! ${playerF} loses to ${computerF}.`;
}

function printFinalResults(playerScore, computerScore) {
  return playerScore > computerScore
    ? "You win! Game over"
    : "You lose! Game over"
}

function addReset() {
  const reset = document.querySelector(".reset");
  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("style", "font-size: 1.5rem; margin-top: 2rem;");
  resetBtn.textContent = "Play again";
  reset.appendChild(resetBtn);
  resetBtn.addEventListener("click", () => window.location.reload());
}

function game() {
  // Initialize scores and keep track
  let playerScore = 0;
  let computerScore = 0;

  const buttons = document.querySelectorAll(".btn");
  const display = document.querySelector(".display-selection");
  const score = document.querySelector(".score");
  // Style elements
  buttons.forEach((btn) => btn.setAttribute("style", "font-size: 2.5rem; margin-top: 2rem;"));
  display.setAttribute("style", "font-size: 2rem; color: blue; margin-top: 2rem;");
  score.setAttribute("style", "white-space: pre-line; font-size: 1.5rem; color: black; margin-top: 2rem;");
  // Wait for button press
  buttons.forEach((btn) => btn.addEventListener("click", () => playHand(btn.id)));

  // Shows results for each round
  function playHand(select) {
    const playerSelection = select;
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    if (result.includes("win")) {
      playerScore++;
    }
    if (result.includes("lose")) {
      computerScore++;
    }
    display.textContent = result;
    score.textContent = `Player score: ${playerScore}\nComputer score: ${computerScore}\n`;
    if (playerScore === 5 || computerScore === 5) {
      score.textContent += printFinalResults(playerScore, computerScore);
      buttons.forEach((btn) => (btn.disabled = true)); // disables buttons with game is over
      addReset(); // adds reset button
    }
  }
}

game();
