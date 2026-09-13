const dayjs = require('dayjs');

const today = dayjs();
const inSevenDays = today.add(7, 'day');
const thirtyDaysAgo = today.subtract(30, 'day');

console.log(`Today: ${today.format('YYYY-MM-DD')} (${today.format('dddd')})`);
console.log(`7 days from now: ${inSevenDays.format('YYYY-MM-DD')} (${inSevenDays.format('dddd')})`);
console.log(`30 days ago: ${thirtyDaysAgo.format('YYYY-MM-DD')} (${thirtyDaysAgo.format('dddd')})`);
