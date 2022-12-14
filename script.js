let clear = document.querySelector(".clear");
let deleteDigit = document.querySelector(".delete");
let equal = document.querySelector(".equal");
let decimal = document.querySelector(".decimal");

let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");

let previous = document.querySelector("#previous");
let current = document.querySelector("#current");

let operator = "";
let previousVal = "";
let currentVal = "";

numbers.forEach((number) =>
  number.addEventListener("click", (e) => {
    chooseNumber(e.target.textContent);
    current.textContent = currentVal;
  })
);

operators.forEach((operate) =>
  operate.addEventListener("click", (e) => {
    chooseOperator(e.target.textContent);
    previous.textContent = previousVal + " " + operator;
    current.textContent = currentVal;
  })
);

clear.addEventListener("click", () => {
  previousVal = "";
  currentVal = "";
  operator = "";
  previous.textContent = currentVal;
  current.textContent = currentVal;
});

equal.addEventListener("click", () => {
  calculate();
  previous.textContent = "";
  if (previousVal.length <= 5) {
    current.textContent = previousVal;
  } else {
    current.textContent = previousVal.slice(0, 5) + "...";
  }
});

decimal.addEventListener("click", () => addDec());

deleteDigit.addEventListener("click", () => {
  deleteNum();
  current.textContent = currentVal;
});

function chooseNumber(num) {
  if (currentVal.length <= 5) {
    currentVal += num;
  }
}

function chooseOperator(op) {
  operator = op;
  previousVal = currentVal;
  currentVal = "";
}

function calculate() {
  previousVal = Number(previousVal);
  currentVal = Number(currentVal);

  if (operator === "+") {
    previousVal += currentVal;
  } else if (operator === "-") {
    previousVal -= currentVal;
  } else if (operator === "x") {
    previousVal *= currentVal;
  } else {
    previousVal /= currentVal;
  }
  previousVal = roundNum(previousVal);
  previousVal = previousVal.toString();
  currentVal = previousVal.toString();
}

function roundNum(num) {
  return Math.round(num * 1000) / 1000;
}

function addDec() {
  if (!currentVal.includes(".")) {
    return (currentVal += ".");
  }
}

function deleteNum() {
  currentVal = currentVal.slice(0, currentVal.length - 1);
}
