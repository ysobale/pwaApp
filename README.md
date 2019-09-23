# pwaApp

Readme file for the pwa weather app

For Weather forcast and current weather used the https://darksky.net API
I have used the latitude and longtitude for accessing the DarkSky API.
Single request to API gives current, hourly and daily forecast of the data. This also gives everything needed.
https://darksky.net/dev/docs

Luxon - Javascript library for datetime and other things


Running the application -> take the checkout of the application from home directory install
npm install
node server.js

launch the web application using 
http://localhost:8080



Application structure 
Node for backend server
All the request to external API and to webserver all goes to the nodejs server.
PWA compliance makes sure that our application has 100% offline support because all the requests are cached

Plane javascript and html,css for website ( No Framework used)


for Geolocation used the browser supported location


