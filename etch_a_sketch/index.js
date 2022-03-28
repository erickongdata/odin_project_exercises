// Add container to document
const container = document.createElement("div");
const body = document.querySelector("body");
container.classList.add("container");
body.appendChild(container);
// Add 16 squares to container
for (let i = 0; i < 16; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.classList.add(`square${i}`);
  container.appendChild(square);
}