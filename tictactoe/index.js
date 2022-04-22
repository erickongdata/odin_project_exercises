// Initialize board
// -------------------------------------
let brd = []; // board data is kept in an array (9 elements)
let marker = "X";
let playerNo = 1;
// This is what is displayed for each marker
const markerSym = {
  _: "",
  X: "X",
  O: "O",
};

// Player control module
// -------------------------------------
const player = (() => {
  function swap() {
    if (marker == "X") {
      marker = "O";
    } else marker = "X";

    if (playerNo == 1) {
      playerNo = 2;
    } else {
      playerNo = 1;
    }
  }

  function reset() {
    marker = "X";
    playerNo = 1;
  }

  return {
    swap,
    reset,
  };
})();

// Board status module
// -------------------------------------
const board = (() => {
  function reset() {
    brd.length = 0; // clears array
    for (let i = 0; i < 9; i++) {
      brd.push("_");
    }
  }

  function gameOver(index) {
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
    gameOver,
  };
})();

// Board display and status display
// -------------------------------------
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
    const status = document.querySelector(".status");
    status.textContent = `Player ${playerNo} with ${marker}`;
  }

  function printGameOver(state) {
    const status = document.querySelector(".status");
    if (state == "win") {
      status.textContent = `Player ${playerNo} with ${marker} WINS!`;
    } else {
      status.textContent = "It a tie!";
    }
    status.textContent += " GAME OVER";
  }

  function gameOverMessage(state) {
    printGameOver(state);
    squareControl.disable();
    addResetBtn();
  }

  function addResetBtn() {
    const resetBtn = document.createElement("button");
    resetBtn.classList.add("reset-btn");
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", gameReset);
    document.body.append(resetBtn);
  }

  function deleteResetBtn() {
    const resetBtn = document.querySelector(".reset-btn");
    resetBtn.remove();
  }

  function gameReset() {
    squareControl.activate();
    deleteResetBtn();
    player.reset();
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

// Square control module
// -------------------------------------
const squareControl = (() => {
  function disable() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) => (sqr.disabled = true));
  }

  function activate() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) => (sqr.disabled = false));
  }

  function select(index) {
    brd[index] = marker;
    document.querySelector(`.square${index}`).textContent = markerSym[marker];
  }

  return {
    disable,
    activate,
    select,
  };
})();

// Computer AI
// -------------------------------------
const computer = (() => {
  function move() {
    setTimeout(() => {
      const index = simple();
      squareControl.select(index);
      if (board.gameOver(index)) return;
      player.swap();
      display.printStatus();
      squareControl.activate();
    }, 1000);
  }

  // Returns random square
  function simple() {
    const available = board.availableSquares();
    return available[Math.floor(Math.random() * available.length)];
  }

  return {
    move,
  };
})();

// Game control and initialization
// -------------------------------------
function game() {
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
        squareControl.select(index);
        squareControl.disable();
        if (board.gameOver(index)) return;
        player.swap();
        display.printStatus();
        computer.move();
      })
    );
  }
}

game();
