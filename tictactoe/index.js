// Board Module Pattern
const board = (() => {
  // Initialize board
  let board = [];
  const markerRef = {
    "_": "_",
    "X": "X",
    "O": "O",
  };

  const reset = () => {
    board.length = 0; // clears array
    for (let i = 0; i < 9; i++) {
      board.push("_");
    }
  };

  const createDisplay = () => {
    const container = document.createElement("div");
    container.classList.add("container");
    for (let i = 0; i < 9; i++) {
      const div = document.createElement("div");
      div.classList.add("square", "square" + i);
      div.dataset.value = i;
      container.append(div);
    }
    document.body.append(container);
  };

  const printDisplay = () => {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      square.textContent = markerRef[board[i]];
    }
  };

  const activate = (marker) => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) =>
      sqr.addEventListener("click", () => {
        const index = sqr.dataset.value;
        board[index] = marker;
        sqr.textContent = markerRef[marker];
      })
    );
  };

  return {
    board,
    reset,
    createDisplay,
    printDisplay,
    activate,
  };
})();

function game() {
  const marker = "X";
  board.reset();
  board.createDisplay();
  board.printDisplay();
  board.activate(marker);
  console.log(board.board);
}

game();
