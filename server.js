'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

//Routes
app.get('/location', (req, res) => {
    let city = req.query.data;

    let newLocation = searchLatToLong(city);

    res.send(newLocation);
})

function searchLatToLong(city){
    const geoData = require('./data/geo.json');

    const geoDataResults = geoData.results[0];

    const newLocation = new Location(city, geoDataResults);
    // const newLocation = {
    //     "search_query": city,
    //     "formatted_query": geoDataResults.formatted_address,
    //     "latitude": geoDataResults.geometry.location.lat,
    //     "longitude": geoDataResults.geometry.location.lng
    // }

    return newLocation;
}

function Location(city, data){
    this.search_query = city;
    this.formatted_query + data.formatted_address;
    this.latitude = data.location.lat;
    this.longitude = data.geometry.location.lng;
}

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))