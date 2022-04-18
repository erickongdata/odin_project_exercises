// Board Module Pattern
const board = (() => {
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

  function reset() {
    board.length = 0; // clears array
    for (let i = 0; i < 9; i++) {
      board.push("_");
    }
  }

  function createDisplay() {
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

  function printDisplay() {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      square.textContent = markerRef[board[i]];
    }
  }

  function updateStatus() {
    const statusDisplay = document.querySelector(".status");
    statusDisplay.textContent = `Player ${player} with ${marker}`;
  }

  function activate() {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) =>
      sqr.addEventListener("click", () => {
        const index = sqr.dataset.value;
        // update board data
        board[index] = marker;
        // Display marker on selected square
        sqr.textContent = markerRef[marker];
        // CHECK FOR WIN
        if (winner(index)) {
          gameEnd("win");
          // CHECK IF BOARD IS FULL
        } else if (!board.includes("_")) {
          gameEnd();
        } else {
          // Switch marker and player every time a square is chosen
          marker = marker == "X" ? "O" : "X";
          player = player == 1 ? 2 : 1;
          updateStatus();
        }
      })
    );
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

  function gameEnd(state) {
    const statusDisplay = document.querySelector(".status");
    if (state == "win") {
      statusDisplay.textContent = `Player ${player} with ${marker} WINS!`;
    } else {
      statusDisplay.textContent = "It a tie!";
    }
    statusDisplay.textContent += " GAME OVER";
  }

  return {
    reset,
    createDisplay,
    printDisplay,
    activate,
  };
})();

function game() {
  // Initialize
  board.reset();
  board.createDisplay();
  board.printDisplay();
  board.activate();
}

game();
