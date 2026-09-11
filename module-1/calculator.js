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
  if (b === 0) return 'Cannot divide by zero';
  return a / b;
}

console.log(`add(4, 2) = ${add(4, 2)}`);
console.log(`subtract(4, 2) = ${subtract(4, 2)}`);
console.log(`multiply(4, 2) = ${multiply(4, 2)}`);
console.log(`divide(4, 2) = ${divide(4, 2)}`);
console.log(`divide(4, 0) = ${divide(4, 0)}`);
