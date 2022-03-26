function computerPlay() {
  const play = ["Rock", "Paper", "Scissors"];
  const choice = Math.floor(Math.random() * 3);
  return play[choice]; // random selection
}

function playRound(playerSelection, computerPlay) {
  // playRound returns the results of each round of play
  const player = playerSelection.toLowerCase();
  const computer = computerPlay.toLowerCase();
  const playerF = player[0].toUpperCase() + player.slice(1); // Capitalize word
  const computerF = computer[0].toUpperCase() + computer.slice(1); // Capitalize word

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return `You win! ${playerF} beats ${computerF}.`;
  }
  if (
    (computer === "rock" && player === "scissors") ||
    (computer === "scissors" && player === "paper") ||
    (computer === "paper" && player === "rock")
  ) {
    return `You lose! ${playerF} loses to ${computerF}.`;
  }
  return `Its a tie! You both chose ${playerF}`;
}

function printResults(playerScore, computerScore) {
  return playerScore > computerScore
    ? "You win! Game over"
    : playerScore < computerScore
    ? "You lose! Game over"
    : "Its a tie. Game over";
}

function game() {
  // Initialize scores and keep track
  let playerScore = 0;
  let computerScore = 0;

  const buttons = document.querySelectorAll(".btn");
  const display = document.querySelector(".display-selection");
  const score = document.querySelector(".score");
  display.setAttribute("style", "font-size: 2rem; color: blue; margin-top: 2rem;");
  score.setAttribute("style", "white-space: pre-line; font-size: 1.5rem; color: black; margin-top: 2rem;");
  buttons.forEach((btn) => btn.addEventListener("click", getSelection));


  function getSelection(e) {
    const playerSelection = e.target.id;
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
    if (playerScore == 5 || computerScore == 5) {
      score.textContent += printResults(playerScore, computerScore);
      buttons.forEach((btn) => btn.removeEventListener("click", getSelection));
    }
  }
}

game();
