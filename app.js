const express = require('express')
const geoCoder = require('./weather.js')
const foreCaster = require('./forecast.js')
const path = require('path')

const Port = process.env.PORT || 8080

const app = express()
const publicPath = path.join(__dirname, '/public')
const appPath = path.join(__dirname, '/public/index.html')

app.use(express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(appPath)
})

app.listen(Port, () => {
  console.log(`The app is running at http://localhost:${Port}`);
})
