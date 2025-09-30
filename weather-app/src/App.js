import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

    const fetchWeather = async () => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;
        const response = await axios.get(url);
        const current = response.data.current;
        setWeather({
          temperature: current.temperature_2m,
          windSpeed: current.wind_speed_10m,
        });
        setError('');
      } catch (err) {
        setError('Failed to fetch weather data. Please check the coordinates.');
        setWeather(null);
      }
    };


  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌤️ Weather Finder</h1>
      <input
        type="text"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '1rem' }}>
          <h2>📍 Location: {weather.location}</h2>
          <p>🌡️ Temperature: {weather.temperature} °C</p>
          <p>💨 Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
