function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve('Done waiting!'), ms);
  });
}

wait(500).then(message => console.log('.then():', message));

sync function withAwait() {
  const message = await wait(500);
  console.log('await:', message);
}
withAwait();

async function withTryCatch() {
  try {
    const message = await wait(500);
    console.log('try/catch:', message);
  } catch (err) {
    console.error('Error:', err);
  }
}
withTryCatch();
