
'use strict';


const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const FORECAST_DELAY = 0;

const API_KEY = '2234562266d18eb17ab92872548951bf';
const BASE_URL = `https://api.darksky.net/forecast`;


const OPEN_WEATHER_API="https://api.openweathermap.org/data/2.5/weather?APPID=b4b1026136685db15732f9d6b2e628ef&"


function getForecast(req, resp) {
    const location = req.params.location || '1.2796709,103.85641989999999';
    const url = `${BASE_URL}/${API_KEY}/${location}`;
    fetch(url).then((resp) => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }).then((data) => {
      setTimeout(() => {
        resp.json(data);
      }, FORECAST_DELAY);
    }).catch((err) => {
      console.error('Dark Sky API Error:', err.message);
      resp.json("");
    });
  }


function getForecastOld(req, resp) {
    const location = req.params.location;
    const url = `${OPEN_WEATHER_API}${location}`;
    fetch(url).then((resp) => {
      if (resp.status !== 200) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }).then((data) => {
      setTimeout(() => {
        resp.json(data);
      }, FORECAST_DELAY);
    }).catch((err) => {
      console.error('Openweather API Error ', err.message);
      resp.json("");
    });
}



function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    console.log(m);
    next();
  });


    // Handle requests for the data
    app.get('/forecast/:location', getForecast);
    app.get('/forecast/', getForecast);
    app.get('/forecast', getForecast);


  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('8080', () => {
    console.log('Local DevServer Started on port 8080...');
  });
}

startServer();

