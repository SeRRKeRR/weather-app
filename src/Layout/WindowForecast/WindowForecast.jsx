import React, { useState } from 'react';
import { WeatherList } from './WeatherList';
import { WeatherDetails } from './WeatherDetails';
import { ForecastSwithBtn } from './ForecastSwithBtn';

export function WindowForsecat() {
  const [ forecastOnWeek, setForecastOnWeek ] = useState(true)

  return (
    <section className="home">
      <div className="window-forecast">
        <div className="window-forecast__container">
          <div className="window-forecast__heading-box">
            <h1 className="window-forecast__heading">Прогноз</h1>
            <div className="window-forecast__switch-btn-box">
              <ForecastSwithBtn
                text={'на неделю'}
                active={forecastOnWeek}
                onClick={() => setForecastOnWeek(true)}
              />
              <ForecastSwithBtn
                text={'почасовой'}
                active={!forecastOnWeek}
                onClick={() => setForecastOnWeek(false)}
              />
            </div>
          </div>
          <WeatherList forecastOnWeek={forecastOnWeek}/>
          <h2 className="window-forecast__heading">Подробно на сегодня</h2>
        </div>
        <WeatherDetails/>
      </div>
    </section>
  );
}
