const request = require('request')

//Geocoding

// const geoCodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/Cuttack.json?access_token=pk.eyJ1IjoibWFoYXBhdHJhZGViaTE3IiwiYSI6ImNsMDZnc2VjMjAwMGUzY3FzaTVydGNoZjUifQ.0z45L42iGbyl_SrKoZHl5g&limit=1'

// request({url : geoCodeURL, json : true},(error,response) => {
//     if(error) {
//         console.log('Unable to connect to the mapbox service')
//     } else if(response.body.message) {
//         console.log(response.body.message)
//     } else if(!response.body.features[0]) {
//         console.log('Search not found. Please try entering another address')
//     } else {
//         const longitude = response.body.features[0].center[0]
//         const latitude = response.body.features[0].center[1]   
//         console.log('latitude is :' + latitude)
//         console.log('longitude is :' + longitude)       
//     }
// })


const geocode = (address,callback) => {

    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFoYXBhdHJhZGViaTE3IiwiYSI6ImNsMDZnc2VjMjAwMGUzY3FzaTVydGNoZjUifQ.0z45L42iGbyl_SrKoZHl5g&limit=1'
    
    request({url, json : true},(error,{body}) => {
        if(error) {

            callback('Unable to connect to the mapbox service', undefined)

        } else if(body.message) {

            callback(body.message, undefined)

        } else if(!body.features[0]) {

            callback('Search not found. Please try entering another address', undefined)

        } else {
            
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name 
            })

        }

    })
    
}


module.exports = geocode