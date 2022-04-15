// Board Module Pattern
const board = (() => {
  // Initialize board
  let board = []; // board data is kept in an array (9 elements)
  let marker = "X";
  // This is what is displayed for each marker
  const markerRef = {
    _: "",
    X: "X",
    O: "O",
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

  const activate = () => {
    const squares = document.querySelectorAll(".square");
    squares.forEach((sqr) =>
      sqr.addEventListener("click", () => {
        const index = sqr.dataset.value;
        // update board data
        board[index] = marker;
        // Display marker on selected square
        sqr.textContent = markerRef[marker];
        // Switch marker every time a square is chosen
        marker = marker == "X" ? "O" : "X";

        // CHECK FOR WIN
        // CHECK FULL BOARD
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
  // Initialize
  board.reset();
  board.createDisplay();
  board.printDisplay();
  board.activate();
  console.log(board.board);
}

game();
