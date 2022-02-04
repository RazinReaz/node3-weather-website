const path = require('path')
const express = require('express') //this is not an object, but a function
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000


//define paths
const publicDirectoryPath = path.join(__dirname, '../public') // The is the directory with all the html files
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars
app.set('view engine','hbs') //using handlebars for views
app.set('views', viewsPath) //looks for the hbs files in the viewsPath, default path is 'views' but we dont have that in the root directory
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//now loading hbs files for the pages
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        creator : 'Razin Reaz Abedin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About me',
        creator : 'Razin Reaz Abedin'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title : 'Help',
        creator : 'RazinTheGreat'
    })
})



app.get('/weather', (req, res) => {
    //sends JSON data
    if (!req.query.address){
        return res.send({
            error : 'Please provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
})

app.get('/product', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title : '404',
        creator : 'Razin Reaz Abedin',
        message : 'Help article not found'
    })
})

app.get('*',(req, res) => {
    res.render('error', {
        title : '404',
        name: 'Razin Reaz Abedin',
        message : 'Page not found'
    })
})


//!This starts the server on port 3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})