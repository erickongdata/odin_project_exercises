// Board Module Pattern
const board = (() => {
  // Initialize board
  let board = [];

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
      div.classList.add("square");
      div.classList.add("square" + i);
      container.append(div);
    }
    document.body.append(container);
  };

  const printDisplay = () => {
    for (let i = 0; i < 9; i++) {
      const square = document.querySelector(`.square${i}`);
      const mark = board[i] == "_" ? "_" : board[i] == "X" ? "X" : "O";
      square.textContent = mark;
    }
  };

  return {
    board,
    reset,
    createDisplay,
    printDisplay,
  };
})();

function game() {
  board.reset();
  board.createDisplay();
  board.printDisplay();
  console.log(board.board);
}

game();
