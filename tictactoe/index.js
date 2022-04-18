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
      const div = document.createElement("div");
      div.classList.add("square", "square" + i);
      div.dataset.value = i;
      container.append(div);
    }
    const statusDisplay = document.createElement("div");
    statusDisplay.classList.add("status");
    statusDisplay.textContent = `Player ${player}`;
    document.body.append(container, statusDisplay);
  }

  function printDisplay() {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      square.textContent = markerRef[board[i]];
    }
  }

  function updateStatus() {
    const statusDisplay = document.querySelector(".status");
    statusDisplay.textContent = `Player ${player}`;
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
        if (winner(index, marker)) {
          gameWin(marker);
        }
        // CHECK FULL BOARD
        else if (!board.includes("_")) {
          gameTie();
        }
        // Switch marker and player every time a square is chosen
        else {
          marker = marker == "X" ? "O" : "X";
          player = player == 1 ? 2 : 1;
          updateStatus();
        }
      })
    );
  }

  function winner(index, marker) {
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

  function gameTie() {
    console.log("It a tie");
    gameEnd();
  }

  function gameWin() {
    console.log(`Win for player ${player} with ${marker}`);
    gameEnd();
  }

  function gameEnd() {
    console.log("Game over");
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
