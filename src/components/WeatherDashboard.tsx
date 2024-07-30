import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { getWeatherData } from "../services/weatherService";
import { Weather } from "../types/weather";

const cities = [
  { name: "London, UK", lat: 51.5074, lon: -0.1278 },
  { name: "Paris, France", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin, Germany", lat: 52.52, lon: 13.405 },
  { name: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
  { name: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
  { name: "Amsterdam, Netherlands", lat: 52.3676, lon: 4.9041 },
  { name: "Vienna, Austria", lat: 48.2082, lon: 16.3738 },
  { name: "Brussels, Belgium", lat: 50.8503, lon: 4.3517 },
  { name: "Copenhagen, Denmark", lat: 55.6761, lon: 12.5683 },
  { name: "Lisbon, Portugal", lat: 38.7223, lon: -9.1393 },
];

export const WeatherDashboard = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lat, setLat] = useState<string>("37.7749");
  const [lon, setLon] = useState<string>("-122.4194");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(parseFloat(lat), parseFloat(lon));
      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
        winddirection: data.current_weather.winddirection,
        time: data.current_weather.time,
      });
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (cityLat: number, cityLon: number) => {
    setLat(cityLat.toString());
    setLon(cityLon.toString());
    setDrawerOpen(false);
    fetchWeather();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Card sx={{ minWidth: 300, maxWidth: 500, padding: 2 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              Weather Dashboard
            </Typography>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
          <TextField
            label="Latitude"
            variant="outlined"
            value={lat}
            onChange={(event) => setLat(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Longitude"
            variant="outlined"
            value={lon}
            onChange={(event) => setLon(event.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchWeather}
            disabled={loading}
            fullWidth
          >
            {loading ? "Loading..." : "Get Weather"}
          </Button>
          {error ? (
            <Typography color="error" variant="body2" marginTop={2}>
              {error}
            </Typography>
          ) : null}
          {weather ? (
            <Box marginTop={2}>
              <Typography variant="h6">
                Temperature: {weather.temperature}°C
              </Typography>
              <Typography variant="body1">
                Windspeed: {weather.windspeed} km/h
              </Typography>
              <Typography variant="body1">
                Wind Direction: {weather.winddirection}°
              </Typography>
              <Typography variant="body1">
                Time: {new Date(weather.time).toLocaleString()}
              </Typography>
            </Box>
          ) : null}
        </CardContent>
      </Card>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }}>
          <List>
            {cities.map((city) => (
              <ListItem
                key={city.name}
                onClick={() => handleCitySelect(city.lat, city.lon)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    borderRadius: 1,
                  },
                }}
              >
                <ListItemText primary={city.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
