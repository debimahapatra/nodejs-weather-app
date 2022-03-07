const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=673bfbe2fa4ce30c7a90b20149458594&query=20.2724,85.8339&units=f'


// request({url : url, json: true}, (error,response) => {
//     //console.log(response.body.current)
//     if(error) {
//         console.log('Unable to connect to the weather service')
//     } else if(response.body.error) {
//         console.log(response.body.error.info)
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". The current temperature is: " + response.body.current.temperature + " degrees out. But it feels like " + response.body.current.feelslike + " degrees out.")
//     }
    
// })

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=673bfbe2fa4ce30c7a90b20149458594&query=' + lat + ',' + lon + '&units=f'
    request({url , json: true}, (error, {body}) => {
        if(error){

            callback('Unable to connect to the weather service', undefined)

        } else if(body.error) {

            callback(body.error.info, undefined)

        } else {

            callback(undefined, {
                location: body.location.name,
                country: body.location.country,
                region: body.location.region,
                weather_descriptions : body.current.weather_descriptions[0],
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                humidity: body.current.humidity
            })           

        }
    })
}

module.exports = forecast