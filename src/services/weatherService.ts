import axios from 'axios';
import { WeatherResponse } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (lat: number, lon: number): Promise<WeatherResponse> => {
  const response = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true,
      hourly: 'temperature_2m,windspeed_10m',
      daily: 'temperature_2m_min,temperature_2m_max,precipitation_sum,weathercode',
      timezone: 'auto',
    },
  });

  return response.data;
};
