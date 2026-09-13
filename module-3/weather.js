// weather.js
// Exercise 3.2 — Fetch a Real API
async function getWeather() {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=14.6&longitude=121.0&current_weather=true'
    );
    const data = await response.json();
    console.log('Current weather:', data.current_weather);
  } catch (err) {
    console.error('Error:', err);
  }
}

getWeather();
