import { openweathermapKey } from "./openweathermapKey"

export async function getWeatherFiveApi({
  lat,
  lon
}) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${openweathermapKey}&units=metric&lang=ru`)
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
