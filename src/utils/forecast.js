const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude +'&lon='+ longitude +'&appid=cd546c9447bcbc98df7740299f51ddd2'
    
    request({url, json : true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        } 
        else if (body.cod === 401){ 
            callback('Cant find weather for the location provided', undefined)
        }
        else{
            const {temp, pressure, humidity} = body.main
            const description = body.weather[0].main
            callback(undefined, description + '. It is ' + (temp-273).toFixed(2) + ' degree celcius, the pressure is ' + (pressure/1013).toFixed(3) + ' atm and the humidity is ' + humidity + '%')
        }
    })
}


module.exports = forecast