import React, { useContext, useEffect, useRef, useState } from 'react';
import { weatherListOnWeekDate, weatherListHourlyDate } from '../dataForecast';
import { generateKey } from '../../../utils/js/generateKey';
import { WeatherDay } from './WeatherDay';
import { ChangeSlideBtn } from './ChangeSlideBtn';
import { useResize } from '../../../utils/hooks/useResize';
import { weatherDataContext } from '../../context/weatherDataContext';
import { getRendersLists } from './getRenderLists';

export function WeatherList({forecastOnWeek}) {
  const { valueWeatherData } = useContext(weatherDataContext)
  const [ slide, setSlide ] = useState(0)
  const [ animation, setAnimation ] = useState(true)
  const [ renderLists, setRenderLists ] = useState({
    listOnWeek: weatherListOnWeekDate,
    listHourly: weatherListHourlyDate
  })
  const choiceListData = (choice) =>  {
    return choice ? renderLists.listOnWeek : renderLists.listHourly
  }

  const items = choiceListData(forecastOnWeek)
  const refUl = useRef(null)
  const [ windowWidth ] = useResize()

  let slideInWindow = 6

  if (windowWidth >= 1439) {
    slideInWindow = 6
  } else if (windowWidth >= 833) {
    slideInWindow = 3
  } else {
    slideInWindow = items.length
  }

  const maxSlide = items.length - slideInWindow

  function setSlideWithoutAnimation(slideNumder) {
    setAnimation(false)
    setSlide(slideNumder)
    setTimeout(() => setAnimation(true), 1)
  }

  if (maxSlide < slide) setSlideWithoutAnimation(maxSlide)

  const changeSlide = (direction = 1) => {

    let slideNumber = 0;

    if (slide + direction < 0) {
      slideNumber = items.length - 1;
    } else {
      slideNumber = (slide + direction) % items.length;
    }

    if (slideNumber > maxSlide) slideNumber = maxSlide

    setSlide(slideNumber)
  }

  const disabledBtn = (slideNumber, leftBtn) => {
    if (
      (slideNumber === 0 && leftBtn) ||
      (slideNumber === maxSlide && !leftBtn)
    ) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    setSlideWithoutAnimation(0)
  }, [forecastOnWeek])

  useEffect(() => {
    const newRenderLists = getRendersLists(valueWeatherData)

    if (newRenderLists.downloaded) setRenderLists(newRenderLists)
  }, [valueWeatherData])

  return (
    <div className="weather-list">
      <div className="weather-list__btn-box-left">
        <ChangeSlideBtn
          onClick={() => changeSlide(-1)}
          disabled={disabledBtn(slide, true)}
        />
      </div>
      <div className="weather-list__window">
        <ul
          className={`weather-list__container ${animation ? 'active' : ''}`}
          style={{
            transform: `translateX(-${slide * 124}px)`
          }}
          ref={refUl}
        >
          {
            items.map(generateKey).map(({
              key,
              date,
              degree,
              dataImg
            }) => (
              <li className='weather-list__item' key={`1${key}1`}>
                <WeatherDay
                  key={key}
                  date={date}
                  degree={degree}
                  dataImg={dataImg}
                />
              </li>
            ))
          }
        </ul>
      </div>
      <div className="weather-list__btn-box-right">
        <ChangeSlideBtn
          onClick={() => changeSlide(1)}
          disabled={disabledBtn(slide, false)}
        />
      </div>
    </div>
  );
}
