const express = require('express')
const geoCoder = require('./weather.js')
const foreCaster = require('./forecast.js')
const path = require('path')
const { error } = require('console')

const Port = process.env.PORT || 8080

const app = express()
const publicPath = path.join(__dirname, '/public')
const appPath = path.join(__dirname, '/public/index.html')
const path404 = path.join(__dirname, '/public/404.html')

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(appPath)
})

app.get('/api/weather', (req, res) => {
  const place = req.query.address

  if(place){

    geoCoder(place, (error, {latitude, longitude} = {}) => {
      if(error){
        res.send({
          error : error
        })
      }
      else{
        foreCaster(latitude, longitude, (error, {temprature, fells_like, weather_description} = {}) => {
          if(error){
            res.send({
              error : error
            })
          }
          else{
            res.send({
              temprature : temprature,
              feelsLike : fells_like,
              weather_description : weather_description
            })
          }
        })
      }
    })
  }
  else{
    res.send({
      error : 'You should provide a address.'
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path404)
})

app.listen(Port, () => {
  console.log(`The app is running at http://localhost:${Port}`);
})
