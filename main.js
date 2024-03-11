const display_1 = document.querySelector(".display_1");
const display_2 = document.querySelector(".display_2");

let combinedValue = "";
let MAX_DIGIT_LIMIT = 22;


function appendDigit(value) {
  if (value === 0 && combinedValue.length === 1 && combinedValue[0] === "0") {
    return;
  }

  if (value === ".") {
    value = "0.";
  }

  if (!isOperatorColliding(value)) {
    combinedValue += value;

    if (
      isOperator(combinedValue[combinedValue.length - 3]) &&
      combinedValue[combinedValue.length - 2] === "0" &&
      value === 0
    ) {
      combinedValue = combinedValue.substring(0, combinedValue.length - 1);
    } else if (
      isOperator(combinedValue[combinedValue.length - 2]) &&
      isOperator(combinedValue[combinedValue.length - 1]) &&
      ((combinedValue[combinedValue.length - 1] !== "+" && value !== "-") ||
        (combinedValue[combinedValue.length - 1] !== "-" && value !== "+"))
    ) {
      combinedValue = combinedValue.substring(0, combinedValue.length - 2);
      combinedValue += value;
    }
  }

  display_1.innerHTML = combinedValue;
}

function isOperator(value) {
  const operators = ["+", "-", "*", "/"];
  return operators.includes(value);
}

function displayCurrentValue(value) {
  display_2.innerHTML = value;
}

function reset() {
  display_1.innerHTML = "";
  display_2.innerHTML = 0;
  combinedValue = "";
}

function calculate() {
  let result;
  if (combinedValue) {
    result = eval(combinedValue);
  }

  displayResult(result);
}

function displayResult(result) {
  display_1.innerHTML = `${combinedValue} = ${result}`;
  display_2.innerHTML = result;
  combinedValue = result;
}

function isOperatorColliding(value) {
  const lastUsedOperator = combinedValue[combinedValue.length - 1];

  if (isOperator(value)) {
    if (lastUsedOperator === value) {
      return true;
    } else if (
      (lastUsedOperator === "+" && value === "-") ||
      (lastUsedOperator === "-" && value === "+")
    ) {
      return false;
    }

    return false;
  }

  return false;
}
