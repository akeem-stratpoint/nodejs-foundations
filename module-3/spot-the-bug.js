//// Buggy version (prints a Promise object instead of 42):
//
// function getNumber() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(42), 500);
//   });
// }
//
// function main() {
//   const number = getNumber();
//   console.log('The number is:', number);
// }
//
// main();
//
// Bug: `main` never awaits `getNumber()`, and it isn't declared `async`, so
// `number` is the Promise itself, not the value it resolves to. The two
// missing keywords are `async` (on `main`) and `await` (before `getNumber()`).

function getNumber() {
  return new Promise(resolve => {
    setTimeout(() => resolve(42), 500);
  });
}

async function main() {
  const number = await getNumber();
  console.log('The number is:', number);
}

main();
