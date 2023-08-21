import React, { useContext } from 'react';
import { weatherDetailslistDate } from '../dataForecast';
import { generateKey } from '../../../utils/js/generateKey';
import { WeatherDetailsCard } from './WeatherDetailsCard';
import { weatherDataContext } from '../../context/weatherDataContext';
import { checkValue } from '../../../utils/js/checkValue';

export function WeatherDetails() {
  const { valueWeatherData } = useContext(weatherDataContext)
  const renderList = weatherDetailslistDate.slice(0)

  renderList[3].indication = Math.trunc(checkValue(valueWeatherData.main, { pressure: 989.2489 }).pressure * 0.750064)
  renderList[2].indication = checkValue(valueWeatherData.visibility, 62500) / 1000
  renderList[1].indication = checkValue(valueWeatherData.main, { humidity: 84 }).humidity
  renderList[0].indication = Math.round(checkValue(valueWeatherData.wind, { speed: 7 }).speed)
  renderList[0].windDirection = checkValue(valueWeatherData.wind, { deg: 0 }).deg

  return (
    <div className="weather-details">
      <ul className='weather-details__list'>
        {
          renderList.map(generateKey).map(({
            key,
            weather,
            indication,
            unit,
            windDirection
          }) => (
            <li className='weather-details__item' key={`1${key}1`}>
              <WeatherDetailsCard
                key={key}
                weather={weather}
                indication={indication}
                unit={unit}
                windDirection={windDirection}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}
