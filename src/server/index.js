const express = require("express");
const app = express();
const cors = require("cors");

//read the json files coming to you
app.use(express.json());
app.use(express.static("dist"));

//require dotenv
require("dotenv").config();

//get the city function which get location from geoNames
const { getCityLoc } = require("./getCityLoc");
const { weatherTemp } = require("./weatherTemp");
const { getCityPic } = require("./getCityPic");

//using cors
app.use(cors());

port = 3000;

const username = process.env.USERNAME;
const WEATHER_KEY = process.env.WEATHER_KEY;
const pixabay_key = process.env.pixabay_key;

app.get("/", (req, res) => {
  res.render("index.html");
});

app.post("/getCity", async (req, res) => {
  const city = req.body.city;
  const Location = await getCityLoc(city, username);
  return res.send(Location);
});

app.post("/getWeather", async (req, res) => {
  const { lng, lat, remainingDays } = req.body;
  const getWeather = await weatherTemp(lng, lat, remainingDays, WEATHER_KEY);
  return res.send(getWeather);
});

app.post("/getCityPic", async (req, res) => {
  const { city_name } = req.body;
  const getPic = await getCityPic(city_name, pixabay_key);
  return res.send(getPic);
});

app.listen(3000, () => console.log(`server is listening on port ${port}`));
