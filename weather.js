const request = require('request')

const geoCoder = (place, callback) => {
  if(typeof callback == 'function'){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoicHJhdHVzaHJhaTAzMDkiLCJhIjoiY2tmNnk0b2x1MTEyaDMyb2Z0bWtpaHdzMiJ9.47m9Cuqgfm_uROruuGQZHQ`

    request({ url : url, json : true }, (error, {body} = {}) => {
      if(error){
        callback('Unable to connect to internet', undefined)
      }
      else if(body.features.length == 0){
        callback('Unable to find location', undefined)
      }
      else{
        callback(undefined, {
          latitude : body.features[0].center[1],
          longitude : body.features[0].center[0]
        })
      }
    })
  }
  else{
    console.log('You should use callback as function');
  }
}

module.exports = geoCoder
