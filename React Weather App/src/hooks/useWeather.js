import { useEffect, useState } from "react";
import {
  getCurrentWeather,
  getCurrentWeatherByCoords,
  getWeatherForecast,
} from "../services/weatherAPI";

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnits] = useState("C");

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecast] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city),
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecast);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weatherData = await getCurrentWeatherByCoords(
            latitude,
            longitude
          );
          setCurrentWeather(weatherData);

          const forecastData = await getWeatherForecast(weatherData.name);
          setForecast(forecastData);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Failed to fetch weather data"
          );
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(
          "Unable to retrieve your location. Please allow location access and try again."
        );
        setLoading(false);
      }
    );
  };

  const toggleUnits = () => {
    setUnits((prevUnit) => (prevUnit === "C" ? "F" : "C"));
  };

  useEffect(() => {
    fetchWeatherByCity("New York");
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    toggleUnits,
  };
};
