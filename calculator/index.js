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
  const result =
    operator == "+" ? add(a, b) : operator == "-" ? subtract(a, b) : operator == "x" ? multiply(a, b) : divide(a, b);
  console.log(result);
  // This catches values that exceed limits
  if (result > 9999999999 || result < -9999999999 || !result) {
    clearScreen();
    displayInput = "ERROR";
    return "error";
  }
  if (result < 0.000001 && result > -0.000001) {
    console.log("Very small number!");
    return 0;
  }
  return result;
}

function convertOperator(operator) {
  return operator == "add" ? "+" : operator == "subtract" ? "-" : operator == "multiply" ? "x" : "÷";
}

function drawCalculator() {
  const body = document.body;
  const buttonSize = 64;
  const buttonNames = [
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
  const buttonLabels = ["C", "<<", "÷", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];
  const keyCode = [
    "c",
    "Backspace",
    "d",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "=",
    "0",
    ".",
    "Enter",
  ];
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
  for (let i = 0; i < buttonNames.length; i++) {
    const btn = document.createElement("div");
    const btnName = buttonNames[i];
    const kbd = document.createElement("kbd");
    kbd.textContent = buttonLabels[i];
    btn.classList.add("btn-" + btnName);
    btn.classList.add("calc-btn");
    btn.dataset.value = btnName;
    btn.dataset.key = keyCode[i];
    btn.addEventListener("click", () => calculator(btnName));
    btn.append(kbd);
    container.append(btn);
  }
  // Append calculator into document and refresh screen
  body.append(container);
  updateScreen();
  // Add keyboard support
  window.addEventListener("keydown", keyboardInput);
}

function keyboardInput(e) {
  const key = document.querySelector(`div[data-key="${e.key}"]`);
  calculator(key.dataset.value);
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
  if (displayInput.includes("ERROR")) return 9;
  if (displayInput == ".") return 6;
  if (displayInput == "-") return 5;
  if (displayInput) {
    if (!displayOperator) return 2;
    return 4;
  }
  if (!displayOperator) return 1;
  return 3;
}

function parseDisplayInput() {
  // remove trailing period from input if present
  const len = displayInput.length;
  if (displayInput[len - 1] == ".") {
    displayInput = displayInput.slice(0, len - 1);
  }
}

function calculator(input) {
  const state = getCalculatorState();
  let calcResult = 0;
  // console.log(input);
  console.log("state: " + state);
  // Any input clears the screen if there is an error
  if (state === 9) {
    clearScreen();
  }
  // Assess possible inputs using switch/case statement
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
      // Append digit to main display and limit max length
      if (displayInput != "0" && displayInput.length < 10) {
        displayInput += input;
        break;
      }
      // If current display is 0 digit - remove and append new digit
      if (displayInput == "0") {
        displayInput = input;
      }
      break;
    case "equals":
      parseDisplayInput();
      if (state === 6) break;
      if (state === 4) {
        calcResult = operate(displayOperator, +displayResult, +displayInput);
        if (calcResult == "error") break;
        displayResult = calcResult.toString();
        displayInput = displayResult.slice(0, 10); // limit max length of result
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
      if (displayInput != "0" && displayInput.length < 10) {
        displayInput += "0";
      }
      break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      parseDisplayInput();
      // Depending on the calculator state - process the input and update the display
      if (state === 2) {
        displayResult = displayInput;
        displayOperator = convertOperator(input);
        displayInput = "";
        break;
      }
      if (state === 4) {
        calcResult = operate(displayOperator, +displayResult, +displayInput);
        if (calcResult == "error") break;
        displayResult = calcResult.toString();
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
