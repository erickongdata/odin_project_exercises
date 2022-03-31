// screen variables
let displayInput = "0"; // main display
let displayOperator = ""; // upper-right
let currentResult = ""; // upper-left

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
    const div = document.createElement("div");
    const className = "btn-" + buttonList[i];
    div.classList.add("calc-btn");
    div.classList.add(className);
    div.textContent = buttonText[i];
    div.id = className;
    div.addEventListener("click", () => calculator(div.id));
    container.append(div);
  }
  // Append calculator into document and refresh screen
  body.append(container);
  updateScreen();
}

function updateScreen() {
  const screenUpper = document.querySelector(".screen__upper");
  const screenOperator = document.querySelector(".screen__operator");
  const screenMain = document.querySelector(".screen__main");
  screenUpper.textContent = currentResult;
  screenOperator.textContent = displayOperator;
  screenMain.textContent = displayInput;
}

function clearScreen() {
  displayInput = "";
  displayOperator = "";
  currentResult = "";
  updateScreen();
}

function getCalculatorState() {
  if (displayInput) {
    if (!displayOperator) return 2;
    return 4;
  }
  if (!displayOperator) return 1;
  return 3;
}

function operatorConvert(displayOperator, currentResult, displayInput) {
  if (displayOperator == "+") return operate(add, currentResult, displayInput);
  if (displayOperator == "-") return operate(subtract, currentResult, displayInput);
  if (displayOperator == "x") return operate(multiply, currentResult, displayInput);
  return operate(divide, currentResult, displayInput);
}

function calculator(input) {
  const state = getCalculatorState();
  console.log(input);
  switch (input) {
    case "btn-clear":
      clearScreen();
      break;
    case "btn-1":
    case "btn-2":
    case "btn-3":
    case "btn-4":
    case "btn-5":
    case "btn-6":
    case "btn-7":
    case "btn-8":
    case "btn-9":
      // Append digit to main display
      if (displayInput != "0") {
        console.log(input);
        displayInput += input[4];
        updateScreen();
        break;
      }
      // If current display is 0 digit - remove and append new digit
      displayInput = input[4];
      updateScreen();
      break;
    case "btn-equals":
      if (state == 4) {
        currentResult = operatorConvert(displayOperator, currentResult, displayInput);
        displayInput = currentResult;
        currentResult = "";
        displayOperator = "";
        updateScreen();
        break;
      }
      break;
  }
}

drawCalculator();
