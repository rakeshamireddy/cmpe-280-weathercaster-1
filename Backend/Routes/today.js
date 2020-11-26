
const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');
const request = require('request');
const moment = require('moment');

router.get('/today/celsius', async (req, res) => {
    const CityStateCountry = req.query.CityStateCountry;
    const units = req.query.units;
    const api_key = process.env.API_KEY;
    let lat;
    let lon;
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=AIzaSyDyyfJZ0-z7Q8GDfqg6mnZiow3Eaeq1Gxc`, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            //console.log('body:', body);  
            //console.log('body:', body.results[0]);
            let bodydata = JSON.parse(body);
            console.log('body:', bodydata.results[0].geometry.location);
            lat = bodydata.results[0].geometry.location.lat;
            lon = bodydata.results[0].geometry.location.lng;
            const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily&units=metric&appid=${api_key}`;
            request(weather_url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    console.log('body:', body);
                    let data = JSON.parse(body);
                    //console.log('date:', new Date(data.current.dt*1000));
                    console.log('date:', moment.unix(data.current.dt).format("MM/DD/YYYY"));
                    console.log('time:', moment.unix(data.current.dt).format("LTS"));
                    res.status(200).json(data);
                }
            });

        }
    });
});

router.get('/today/farenheit', async (req, res) => {
    const CityStateCountry = req.query.CityStateCountry;
    const units = req.query.units;
    const api_key = process.env.API_KEY;
    let lat;
    let lon;
    request(`https://maps.googleapis.com/maps/api/geocode/json?address=${CityStateCountry}&key=AIzaSyDyyfJZ0-z7Q8GDfqg6mnZiow3Eaeq1Gxc`, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {
            //console.log('body:', body);  
            //console.log('body:', body.results[0]);
            let bodydata = JSON.parse(body);
            console.log('body:', bodydata.results[0].geometry.location);
            lat = bodydata.results[0].geometry.location.lat;
            lon = bodydata.results[0].geometry.location.lng;
            const weather_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,daily&units=imperial&appid=${api_key}`;
            request(weather_url, function (err, response, body) {
                if (err) {
                    console.log('error:', error);
                } else {
                    console.log('body:', body);
                    let data = JSON.parse(body);
                    //console.log('date:', new Date(data.current.dt*1000));
                    console.log('date:', moment.unix(data.current.dt).format("MM/DD/YYYY"));
                    console.log('time:', moment.unix(data.current.dt).format("LTS"));
                    res.status(200).json(data);
                }
            });

        }
    });
});

module.exports = router;