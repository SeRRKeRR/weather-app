import React, { useContext } from 'react';
import northwestern from '../../../../assets/img/svg/northwestern.svg';
import { loadingWeatherContext } from '../../../context/loadingWeatherContext';
import { LoadingAnimation } from '../../../LoadingAnimation';
import { HumidityStrip } from './HumidityStrip';
import { WindDirection } from './WindDirection';


export function WeatherDetailsCard({
  weather,
  indication,
  unit,
  windDirection
}) {
  const { valueLoading } = useContext(loadingWeatherContext)
  const humidityBool = weather === 'Влажность' ? true : false

  return (
    <div className='weather-details-card__container'>
      {!valueLoading && <>
        <span className="weather-details-card__weather">{weather}</span>
        <div className="weather-details-card__indication-box">
          <span className="weather-details-card__indication">{indication}</span>
          <span className="weather-details-card__unit">{unit}</span>
        </div>
        {humidityBool &&
          <HumidityStrip value={indication} />
        }
        {Boolean(windDirection) &&
          <WindDirection windDirection={windDirection} />
        }
      </>}
      {valueLoading &&
        <LoadingAnimation/>
      }
    </div>
  )
}
