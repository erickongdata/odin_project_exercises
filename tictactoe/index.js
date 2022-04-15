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
      // div.addEventListener("click", selectSquare);
      container.append(div);
    }
    document.body.append(container);
  };

  return {
    board,
    reset,
    createDisplay,
  };
})();

function game() {
  board.reset();
  board.createDisplay();
  console.log(board.board);
}

game();
