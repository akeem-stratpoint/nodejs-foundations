// string-utils.test.js
const { capitalize, reverse, countWords, isEmail } = require('./string-utils');

describe('capitalize', () => {
  test('capitalizes the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('leaves an already-capitalized string unchanged', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  test('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('reverse', () => {
  test('reverses a word', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  test('reverses a sentence, including spaces', () => {
    expect(reverse('a b c')).toBe('c b a');
  });

  test('returns an empty string for empty input', () => {
    expect(reverse('')).toBe('');
  });
});

describe('countWords', () => {
  test('counts words separated by single spaces', () => {
    expect(countWords('the quick brown fox')).toBe(4);
  });

  test('ignores extra whitespace between words', () => {
    expect(countWords('  hello   world  ')).toBe(2);
  });

  test('returns 0 for an empty string', () => {
    expect(countWords('')).toBe(0);
  });
});

describe('isEmail', () => {
  test('returns true for a valid email', () => {
    expect(isEmail('user@example.com')).toBe(true);
  });

  test('returns false for a string with no @', () => {
    expect(isEmail('userexample.com')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isEmail(null)).toBe(false);
  });
});
