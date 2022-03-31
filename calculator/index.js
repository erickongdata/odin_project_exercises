function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  return operator(a, b);
}

function drawCalculator() {
  const body = document.body;
  const buttonSize = 64;
  const buttonList = [
    "clear",
    "backspace",
    "divide",
    "7",
    "8",
    "9",
    "multiple",
    "4",
    "5",
    "6",
    "subtract",
    "1",
    "2",
    "3",
    "add",
    "0",
    "period",
    "equals",
  ];
  const buttonText = ["C", "<<", "÷", "7", "8", "9", "X", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  // Create calculator container
  // dimensions of calculator are 7 x 4 button units
  const container = document.createElement("div");
  container.setAttribute("style", `width: ${4 * buttonSize}px; height: ${7 * buttonSize}px;`);
  container.classList.add("container");
  container.style.backgroundColor = "lightblue";
  // add screen
  const screen = document.createElement("div");
  screen.classList.add("screen");
  screen.style.backgroundColor = "lightgreen";
  container.append(screen);
  // add buttons
  for (let i = 0; i < buttonList.length; i++) {
    const div = document.createElement("div");
    const className = "btn-" + buttonList[i];
    div.classList.add("calc-btn");
    div.classList.add(className);
    div.textContent = buttonText[i];
    div.id = className;
    container.append(div);
  }

  body.append(container);
}

drawCalculator();
