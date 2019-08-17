const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3JhaGFtMjAiLCJhIjoiY2p6ZjRyMnFiMDZ6cjNubnJtazZyNmoxcSJ9.XfOHsDmvaJur9MksOR7hxg&limit=1'

    request ( {url:url, json:true}, (error, response) => {
        if (error) {
            // Return with error and data undefined
            callback('Unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('Could not find specified location', undefined)
        } else {
            // Return with data and error undefined
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode