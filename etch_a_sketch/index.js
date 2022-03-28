const body = document.querySelector("body");
// Add reset button
const resetBtn = document.createElement("button");
resetBtn.classList.add("reset");
resetBtn.textContent = "Reset";
body.appendChild(resetBtn);
resetBtn.addEventListener("click", resetBoard);

// Add container to document
const container = document.createElement("div");
container.classList.add("container");
container.setAttribute("style", "grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr);");
body.appendChild(container);

// Add 16 squares to container
createSquares(4);

// Add light square effect
function lightSquare(square) {
  square.classList.add("hover");
}

function resetBoard() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => sqr.classList.remove("hover"));
  squares.forEach((sqr) => container.removeChild(sqr));
  const size = prompt("Grid size? ");
  container.setAttribute(
    "style",
    `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`
  );
  createSquares(size);
}

function createSquares(size) {
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(`square${i}`);
    container.appendChild(square);
  }
  const squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => sqr.addEventListener("mouseover", () => lightSquare(sqr)));
}
