import React, { useContext } from 'react';
import { loadingWeatherContext } from '../../../context/loadingWeatherContext';
import { LoadingAnimation } from '../../../LoadingAnimation';

export function WeatherDay({
  date,
  degree,
  dataImg
}) {
  const { valueLoading } = useContext(loadingWeatherContext)
  const checkDegreeNight = Boolean(degree.night)
  const checkData = Boolean(date)

  return (
    <article className='weather-day'>
      {checkData && <>
        {!valueLoading && <>
          <span className="weather-day__date">{date}</span>
          <div className="weather-day__img-box">
            <img className="weather-day__img" src={dataImg.src} alt={dataImg.alt}/>
          </div>
          {checkDegreeNight &&
            <div className="weather-day__degree-box">
              <span className="weather-day__degree-day">{`${degree.day}°C`}</span>
              <span className="weather-day__degree-night">{`${degree.night == '-/-' ? '-/-' : `${degree.night}°C`}`}</span>
            </div>
          }
          {!checkDegreeNight &&
            <span className="weather-day__degree-day">{`${degree.day}°C`}</span>
          }
        </>}
        {valueLoading &&
          <LoadingAnimation />
        }
      </>}
      {!checkData &&
        <div className="weather-day__plug">
          <span className="weather-day__plug-text">Уже скоро</span>
        </div>
      }
    </article>
  );
}
