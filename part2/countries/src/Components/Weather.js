import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
      )
      .then((resp) => setWeather(resp.data));
  }, [api_key, capital]);

  if (weather === null) return null;
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        {weather.weather[0].main} - {weather.weather[0].description}
      </p>
      <p>
        <strong>temperature:</strong> {(weather.main.temp - 273).toFixed(2)}{" "}
        Celsius
      </p>
      <img
        src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="weather icon"
      />
      <p>
        <strong>wind:</strong> {weather.wind.speed} meter per second direction{" "}
        {weather.wind.deg} degrees
      </p>
    </div>
  );
};
export default Weather;
