import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import cloudyNight from "./assets/icons/cloudy-night.svg";
import cloudy from "./assets/icons/cloudy.svg";
import day from "./assets/icons/day.svg";
import night from "./assets/icons/night.svg";
import perfectDay from "./assets/icons/perfect-day.svg";
import rainNight from "./assets/icons/rain-night.svg";
import rain from "./assets/icons/rain.svg";
import strom from "./assets/icons/storm.svg";
import CityComponent from "./components/CityComponent";
import LogIn from "./components/LogIn";
import WeatherComponent from "./components/WeatherInfoComponent";
import { logout } from "./store/weatherApp";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const WeatherIcons = {
  "01d": night,
  "01n": night,
  "02d": day,
  "02n": cloudyNight,
  "03d": cloudy,
  "03n": cloudy,
  "04d": perfectDay,
  "04n": cloudyNight,
  "09d": rain,
  "09n": rainNight,
  "10d": rain,
  "10n": rainNight,
  "11d": strom,
  "11n": strom,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: Montserrat;
`;

const AppLabel = styled.span`
  color: black;
  margin: 20px auto;
  font-size: 18px;
  font-weight: bold;
`;
const CloseButton = styled.span`
  padding: 2px 3px;
  background-color: black;
  border-radius: 50%;
  color: white;
  position: absolute;
`;

function App() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await Axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
    );
    updateWeather(response.data);
  };

  const user = useSelector((state) => state.counter.username);
  const dispatch = useDispatch();

  return (
    <>
      {!user ? (
        <LogIn />
      ) : (
        <>
          <Box sx={{ display: "flex" }}>
            <AppBar
              component="nav"
              style={{ background: "#fff", color: "black" }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  sx={{ mr: 2, display: { sm: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  {user?.toUpperCase()}
                </Typography>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Button
                    sx={{ color: "#333" }}
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Button>
                  {city && weather && (
                    <Button
                      sx={{ color: "#333" }}
                      onClick={() => {
                        updateCity(undefined);
                        updateWeather(undefined);
                      }}
                    >
                      Check Again
                    </Button>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          </Box>
          <Container>
            <AppLabel>React Weather App</AppLabel>
            {city && weather ? (
              <WeatherComponent weather={weather} city={city} />
            ) : (
              <CityComponent
                updateCity={updateCity}
                fetchWeather={fetchWeather}
              />
            )}
          </Container>
        </>
      )}
    </>
  );
}

export default App;
