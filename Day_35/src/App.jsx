import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState(localStorage.getItem("city") || "");

  const API_KEY = "a505414c98345ca932d7a1152748d622";
  const API = `/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const getData = async () => {
      if (city === "") {
        setLoading(false);
        return setError("Searh City Name");
      }
      const res = await axios.get(API);
      setWeather(res.data);
      setLoading(false);
    };
    getData();
  }, []);

  const getWeather = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(API);
      setWeather(res.data);
      setLoading(false);
      localStorage.setItem("city", city);
    } catch (error) {
      setError("City Not Found");
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}

      {weather && !loading && (
        <div>
          {" "}
          <h1>Wheater : {weather.name}</h1>
          <h2>{weather.main.temp} C</h2>
          <h2>{weather.weather[0].description}</h2>
        </div>
      )}
    </>
  );
};

export default App;
