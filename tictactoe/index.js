// Initialize board
let brd = []; // board data is kept in an array (9 elements)
let marker = "X";
let player = 1;
// This is what is displayed for each marker
const markerSym = {
  _: "",
  X: "X",
  O: "O",
};

function switchPlayer() {
  if (marker == "X") {
    marker = "O";
  } else marker = "X";

  if (player == 1) {
    player = 2;
  } else {
    player = 1;
  }
}

// Board Module Pattern
const board = (() => {
  function reset() {
    brd.length = 0; // clears array
    for (let i = 0; i < 9; i++) {
      brd.push("_");
    }
  }

  function isGameOver(index) {
    // CHECK FOR WIN
    if (winner(index)) {
      display.gameOverMessage("win");
      return true;
    }
    // CHECK IF BOARD IS FULL
    if (!brd.includes("_")) {
      display.gameOverMessage();
      return true;
    }
    return false;
  }

  function winner(index) {
    // CHECK ROWS
    const row_ind = Math.floor(index / 3);
    const row = brd.slice(row_ind * 3, (row_ind + 1) * 3);
    if (row.every((sqr) => sqr == marker)) {
      return true;
    }
    // CHECK COLUMNS
    const col_ind = index % 3;
    const col = [0, 1, 2].map((i) => brd[col_ind + i * 3]);
    if (col.every((sqr) => sqr == marker)) {
      return true;
    }
    // CHECK SELECTED SQUARE IS ON A DIAGONAL, IF SO, THE DIAGONAL(S)
    if (index % 2 == 0) {
      const diagonal1 = [0, 4, 8].map((i) => brd[i]);
      if (diagonal1.every((sqr) => sqr == marker)) {
        return true;
      }
      const diagonal2 = [2, 4, 6].map((i) => brd[i]);
      if (diagonal2.every((sqr) => sqr == marker)) {
        return true;
      }
    }
    return false;
  }

  function availableSquares() {
    return brd.reduce((arr, value, index) => {
      if (value == "_") {
        arr.push(index);
      }
      return arr;
    }, []);
  }

  return {
    reset,
    availableSquares,
    isGameOver,
  };
})();

const display = (() => {
  function createBoard() {
    const container = document.createElement("div");
    container.classList.add("container");
    for (let i = 0; i < 9; i++) {
      const square = document.createElement("button");
      square.classList.add("square", "square" + i);
      square.dataset.value = i;
      container.append(square);
    }
    const statusDisplay = document.createElement("div");
    statusDisplay.classList.add("status");
    document.body.append(container, statusDisplay);
    printStatus();
  }

  function printBoard() {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      square.textContent = markerSym[brd[i]];
    }
  }

  function printStatus() {
    const statusDisplay = document.querySelector(".status");
    statusDisplay.textContent = `Player ${player} with ${marker}`;
  }

  function gameOverMessage(state) {
    const statusDisplay = document.querySelector(".status");
    if (state == "win") {
      statusDisplay.textContent = `Player ${player} with ${marker} WINS!`;
    } else {
      statusDisplay.textContent = "It a tie!";
    }
    statusDisplay.textContent += " GAME OVER";
    // Disable squares
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) => (sqr.disabled = true));
    // Add Reset button
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset-btn");
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", gameReset);
    document.body.append(resetBtn);
  }

  function gameReset() {
    // Reactivate squares
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) => (sqr.disabled = false));
    // Remove Reset button
    const resetBtn = document.querySelector(".reset-btn");
    resetBtn.remove();
    // Reset board
    marker = "X";
    player = 1;
    board.reset();
    printBoard();
    printStatus();
  }

  return {
    createBoard,
    printBoard,
    printStatus,
    gameOverMessage,
    gameReset,
  };
})();

// Computer module pattern
const computer = (() => {
  function simple() {
    const available = board.availableSquares();
    return available[Math.floor(Math.random() * available.length)]; // random
  }
  return {
    simple,
  };
})();

function computerMove() {
  const squares = document.querySelectorAll(".square");
  const compMove = computer.simple();
  brd[compMove] = marker;
  document.querySelector(`.square${compMove}`).textContent = markerSym[marker];
  if (board.isGameOver(compMove)) return;
  switchPlayer();
  display.printStatus();
  squares.forEach((sqr) => (sqr.disabled = false));
}

function game() {
  // Initialize
  board.reset();
  display.createBoard();
  display.printBoard();
  activateGame();

  function activateGame() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) =>
      sqr.addEventListener("click", () => {
        const index = sqr.dataset.value;
        if (brd[index] != "_") return;
        // Player move
        brd[index] = marker;
        sqr.textContent = markerSym[marker];
        squares.forEach((sqr) => (sqr.disabled = true));
        if (board.isGameOver(index)) return;
        switchPlayer();
        display.printStatus();
        // Computer move
        setTimeout(() => {
          computerMove();
        }, 1000);
      })
    );
  }
}

game();
