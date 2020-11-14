
const btn = document.getElementById('sehbtn')
const place = document.getElementById('input')
const temprature = document.getElementById('temp')
const feels_like = document.getElementById('feel')
const weatherDescription = document.getElementById('description')

btn.addEventListener('click', (e) => {
  e.preventDefault()
  temprature.textContent = 'Loading.....'

  feels_like.textContent = ''

  weatherDescription.textContent = ''

  const placeName = place.value

  fetch(`/api/weather?address=${placeName}`).then((response) => {
    response.json().then((data) => {
      if(data.error){
        temprature.textContent = data.error,
        feels_like.textContent = '',
        weatherDescription.textContent = ''
      }
      else{
        temprature.textContent = 'Temprature : ' + data.temprature + ' degree celsius',
        feels_like.textContent = 'It feels like ' + data.feelsLike + ' out there.'
        weatherDescription.textContent = 'Weather Descripton : ' + data.weather_description
      }
    })
  })
})