const request = require('request')

const foreCaster = (latitude, longitude, callback) => {
  if(typeof callback == 'function'){
  const url = `http://api.weatherstack.com/current?access_key=8a0eee6b0ac029ca13cca3cb2419b97c&query=${latitude},${longitude}&units=m`

  request({ url : url, json : true }, (error, {body} = {}) => {
    if(error){
      callback('Unable to connect to internet', undefined)
    }
    else if(body.success == false){
      callback('Unable to find location', undefined)
    }
    else{
      callback(undefined, {
        temprature : body.current.temperature,
        fells_like : body.current.feelslike,
        weather_description : body.current.weather_descriptions[0]
      })
    }
  })
  }
  else{
    console.log('You should use callback as function')
  }
}

module.exports = foreCaster
