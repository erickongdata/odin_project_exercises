// Initialize board
let board = []; // board data is kept in an array (9 elements)
let marker = "X";
let player = 1;
// This is what is displayed for each marker
const markerRef = {
  _: "",
  X: "X",
  O: "O",
};

// Board Module Pattern
const boardMod = (() => {
  function reset() {
    board.length = 0; // clears array
    for (let i = 0; i < 9; i++) {
      board.push("_");
    }
  }

  function activate() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) =>
      sqr.addEventListener("click", () => {
        const index = sqr.dataset.value;
        if (board[index] != "_") return;
        // update board data
        board[index] = marker;
        // Display marker on selected square
        sqr.textContent = markerRef[marker];
        squares.forEach((sqr) => (sqr.disabled = true));
        if (gameOver(index)) return;
        switchPlayer();
        // Computer move
        setTimeout(() => {
          const compMove = computer.simple();
          board[compMove] = marker;
          document.querySelector(`.square${compMove}`).textContent = markerRef[marker];
          if (gameOver(compMove)) return;
          switchPlayer();
          squares.forEach((sqr) => (sqr.disabled = false));
        }, 1000);
      })
    );
  }

  function switchPlayer() {
    marker = marker == "X" ? "O" : "X";
    player = player == 1 ? 2 : 1;
    display.updateStatus();
  }

  function gameOver(index) {
    // CHECK FOR WIN
    if (winner(index)) {
      display.gameOverMessage("win");
      return true;
    }
    // CHECK IF BOARD IS FULL
    if (!board.includes("_")) {
      display.gameOverMessage();
      return true;
    }
    return false;
  }

  function winner(index) {
    // CHECK ROWS
    const row_ind = Math.floor(index / 3);
    const row = board.slice(row_ind * 3, (row_ind + 1) * 3);
    if (row.every((sqr) => sqr == marker)) {
      return true;
    }
    // CHECK COLUMNS
    const col_ind = index % 3;
    const col = [0, 1, 2].map((i) => board[col_ind + i * 3]);
    if (col.every((sqr) => sqr == marker)) {
      return true;
    }
    // CHECK SELECTED SQUARE IS ON A DIAGONAL, IF SO, THE DIAGONAL(S)
    if (index % 2 == 0) {
      const diagonal1 = [0, 4, 8].map((i) => board[i]);
      if (diagonal1.every((sqr) => sqr == marker)) {
        return true;
      }
      const diagonal2 = [2, 4, 6].map((i) => board[i]);
      if (diagonal2.every((sqr) => sqr == marker)) {
        return true;
      }
    }
    return false;
  }

  function availableSquares() {
    return board.reduce((arr, value, index) => {
      if (value == "_") {
        arr.push(index);
      }
      return arr;
    }, []);
  }

  return {
    reset,
    activate,
    availableSquares,
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
    updateStatus();
  }

  function printBoard() {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      square.textContent = markerRef[board[i]];
    }
  }

  function updateStatus() {
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
    boardMod.reset();
    printBoard();
    updateStatus();
  }

  return {
    createBoard,
    printBoard,
    updateStatus,
    gameOverMessage,
    gameReset,
  };
})();

// Computer module pattern
const computer = (() => {
  function simple() {
    const available = boardMod.availableSquares();
    return available[Math.floor(Math.random() * available.length)]; // random
  }
  return {
    simple,
  };
})();

function game() {
  // Initialize
  boardMod.reset();
  display.createBoard();
  display.printBoard();
  boardMod.activate();
}

game();
