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
  // Play for 5 rounds
  for (let i = 0; i < 5; i++) {
    console.log(`Round ${i + 1}/5`);
    const playerSelection = prompt("Rock, paper, or Scissors? ");
    const computerSelection = computerPlay();
    const result = playRound(playerSelection, computerSelection);
    if (result.includes("win")) {
      playerScore++;
    }
    if (result.includes("lose")) {
      computerScore++;
    }
    console.log(result);
    console.log(`Player score: ${playerScore}`);
    console.log(`Computer score: ${computerScore}`);
  }
  // Print out final results
  const finalResult = printResults(playerScore, computerScore);
  console.log(finalResult);
}

game();
