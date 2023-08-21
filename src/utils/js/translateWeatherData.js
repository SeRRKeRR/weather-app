export function translateWeatherData(weather, size = 2) {
  let ru
  const img = `https://openweathermap.org/img/wn/${weather.icon}@${size}x.png`

  switch (weather.main.toLowerCase()) {
    case 'clear':
      ru = 'Ясно'
      break
    case 'clouds':
      ru = 'Облачно'
      break
    case 'snow':
      ru = 'Снег'
      break
    case 'rain':
      ru = 'Дождь'
      break
    case 'drizzle':
      ru = 'Ливень'
      break
    case 'thunderstorm':
      ru = 'Гроза'
      break
    default:
      ru = 'Туман'
      break
  }

  return {
    weather: ru,
    img: img
  }
}
