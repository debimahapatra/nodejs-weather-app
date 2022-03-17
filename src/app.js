const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const ip = require("ip")
ipvar = ip.address()
console.log(ipvar)


const app = express()
const port = process.env.PORT || 8085

// Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Debi Prasad Mahapatra'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title: 'About',
        name: ipvar
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Debi Prasad Mahapatra',
        message: 'This page is the help page'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address in the search query'
        })        
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })  
        }    
        //console.log('Data:', data)
        forecast(longitude, latitude, (error, data) => {
            //console.log('Data:', data)
            if(error){
                return res.send({
                    error: error
                })  
            } 
            res.send({
                forecast: data.weather_descriptions + '.The current temperature is ' + data.temperature + ' degrees out. But feels like ' + data.feelslike + ' degrees',
                location: req.query.address,
                humidity: 'Humidity is ' + data.humidity + '%'
            })
        })
    })

})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404!',
        name: 'Debi Prasad Mahapatra',
        errormessage: 'This is not the help page'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title: '404!',
        name: 'Debi Prasad Mahapatra',
        errormessage: 'Page not found'
    })
})


// app.get('',(req,res) => {
//     res.send('<h1>Hello Express!!!</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send([{
//         name: 'abc',
//         age: 32
//     },{
//         name: 'xyz',
//         age: 23
//     }])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>This is the about page!!!<h1/>')
// })



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})