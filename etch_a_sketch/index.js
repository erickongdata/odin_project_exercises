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
body.appendChild(container);

// Add 64 squares to container
createSquares(8);

function resetBoard() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => container.removeChild(sqr));
  let size = 1;
  do {
    size = prompt("Grid size (1-64)? ");
  } while (size > 64 || size < 1);
  createSquares(size);
}

function createSquares(size) {
  // Add squares
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(`square${i}`);
    container.appendChild(square);
  }
  // Set grid
  container.setAttribute(
    "style",
    `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`
  );
  if (size < 24) {
    container.style.gap = `${64 / size}px`;
  } else {
    container.style.gap = `1px`;
  }
  // Add light square effect on mouse hover
  const squares = document.querySelectorAll(".square");
  squares.forEach((sqr) => sqr.addEventListener("mouseover", () => sqr.classList.add("hover")));
}
