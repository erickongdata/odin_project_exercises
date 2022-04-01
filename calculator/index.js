// screen variables
let displayInput = ""; // main display
let displayOperator = ""; // upper-right
let displayResult = ""; // upper-left

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
  return operator == "+"
    ? add(a, b)
    : operator == "-"
    ? subtract(a, b)
    : operator == "x"
    ? multiply(a, b)
    : divide(a, b);
}

function convertOperator(operator) {
  return operator == "add" ? "+" : operator == "subtract" ? "-" : operator == "multiply" ? "x" : "÷";
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
    "multiply",
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
  const buttonLabel = ["C", "<<", "÷", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  // Create calculator container
  // dimensions of calculator are 7 x 4 button units
  const container = document.createElement("div");
  container.setAttribute("style", `width: ${4 * buttonSize}px; height: ${7 * buttonSize}px;`);
  container.classList.add("container");
  container.style.backgroundColor = "lightblue";
  // add screen
  const screenParts = ["screen__upper", "screen__operator", "screen__main"];
  const screen = document.createElement("div");
  for (let i = 0; i < screenParts.length; i++) {
    const screenPart = document.createElement("div");
    const label = screenParts[i];
    screenPart.classList.add(label);
    screenPart.classList.add("screen__part");
    screen.append(screenPart);
  }
  screen.classList.add("screen");
  screen.style.backgroundColor = "lightgreen";
  container.append(screen);
  // add buttons and activate
  for (let i = 0; i < buttonList.length; i++) {
    const btn = document.createElement("div");
    const btnValue = buttonList[i];
    btn.classList.add("btn-" + btnValue);
    btn.classList.add("calc-btn");
    btn.textContent = buttonLabel[i];
    btn.dataset.value = btnValue;
    btn.addEventListener("click", () => calculator(btnValue));
    container.append(btn);
  }
  // Append calculator into document and refresh screen
  body.append(container);
  updateScreen();
}

function updateScreen() {
  const screenUpper = document.querySelector(".screen__upper");
  const screenOperator = document.querySelector(".screen__operator");
  const screenMain = document.querySelector(".screen__main");
  screenUpper.textContent = displayResult;
  screenOperator.textContent = displayOperator;
  screenMain.textContent = displayInput;
}

function clearScreen() {
  displayInput = "";
  displayOperator = "";
  displayResult = "";
  updateScreen();
}

function getCalculatorState() {
  // Return a code (1-6) that depends what display variables are present
  if (displayInput == ".") return 6;
  if (displayInput == "-") return 5;
  if (displayInput) {
    if (!displayOperator) return 2;
    return 4;
  }
  if (!displayOperator) return 1;
  return 3;
}

function calculator(input) {
  const state = getCalculatorState();
  console.log(input);
  console.log("state" + state);
  switch (input) {
    case "clear":
      clearScreen();
      break;
    case "backspace":
      if (displayInput) {
        displayInput = displayInput.slice(0, -1);
      }
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      // Append digit to main display
      if (displayInput != "0") {
        displayInput += input;
        break;
      }
      // If current display is 0 digit - remove and append new digit
      displayInput = input;
      break;
    case "equals":
      if (state === 6) break;
      if (state === 4) {
        displayResult = operate(displayOperator, +displayResult, +displayInput).toString();
        displayInput = displayResult;
        displayResult = "";
        displayOperator = "";
      }
      break;
    case "period":
      if (!displayInput.includes(".")) {
        displayInput += ".";
      }
      break;
    case "0":
      if (displayInput) {
        displayInput += "0";
      }
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      if (state === 2) {
        displayResult = displayInput;
        displayOperator = convertOperator(input);
        displayInput = "";
        break;
      }
      if (state === 4) {
        displayResult = operate(displayOperator, +displayResult, +displayInput).toString();
        displayOperator = convertOperator(input);
        displayInput = "";
        break;
      }
      if (state === 3) {
        if (input == "subtract") {
          displayInput = "-";
          break;
        }
        displayOperator = convertOperator(input);
        break;
      }
      if (state === 1 && input == "subtract") {
        displayInput = "-";
        break;
      }
      if (state === 5 && input == "add") {
        displayInput = "";
        break;
      }
  }
  updateScreen();
}

drawCalculator();
