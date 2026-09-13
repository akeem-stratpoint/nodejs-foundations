function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function average(numbers) {
  return numbers.reduce((total, n) => total + n, 0) / numbers.length;
}

function max(numbers) {
  return Math.max(...numbers);
}

module.exports = { square, cube, average, max };
