const request = require('request')

const forecast = (longitude, latitude, callback) => {
    url = 'https://api.darksky.net/forecast/3544672e2d5906402eea3ffd902a8c95/' + longitude + ',' + latitude + '?units=si&lang=ja'

    request( {url:url, json:true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find weather for specified longitude/latitude', undefined)
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                currentTemp: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast