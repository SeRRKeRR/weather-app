import React, { useContext, useState } from 'react';
import { ModalWindow } from './ModalWindow';
import { changeTabIndex } from '../../utils/js/changeTabIndex';
import { SwitchThemeBtn } from '../UI/SwitchThemeBtn';
import { searchCityContext } from '../context/searchCityContext';
import { weatherDataContext } from '../context/weatherDataContext';
import { getNewDate } from '../../utils/js/getNewDate';
import { LoadingAnimation } from '../LoadingAnimation';
import { loadingWeatherContext } from '../context/loadingWeatherContext';
import { checkValue } from '../../utils/js/checkValue';
import { translateWeatherData } from '../../utils/js/translateWeatherData';
import { BtnFirstType } from '../UI/BtnFirstType';

export function SidePanel() {
  const { valueLoading } = useContext(loadingWeatherContext)
  const { valueWeatherData } = useContext(weatherDataContext)
  const [ modalOpen, setModalOpen ] = useState(false)
  const closeModal = () => setModalOpen(false)
  const searchCityList = useContext(searchCityContext)
  const searchCityListLength = searchCityList.value.length
  const city = searchCityListLength ? searchCityList.value[searchCityListLength - 1] : 'Москва'
  const { weather, img } = translateWeatherData('weather' in valueWeatherData ? valueWeatherData.weather : {main: 'Snow'}, 4)

  return (
    <div className="side-panel">
      <ModalWindow isOpen={modalOpen} setClose={closeModal}/>
      <div className="side-panel__search-city-btn-box">
        <BtnFirstType
          text={'Поиск города'}
          onClick={() => setModalOpen(true)}
          tabIndex={changeTabIndex(!modalOpen)}
        />
        <SwitchThemeBtn/>
      </div>
      <div className="side-panel__img-container">
        <div className="side-panel__img-box">
          {!valueLoading &&
            <img src={img} className="side-panel__img" alt={weather}/>
          }
          {valueLoading &&
            <LoadingAnimation />
          }
        </div>
      </div>
      <div className="side-panel__container">
        <div className='side-panel__box-weather'>
          {!valueLoading && <>
            <div className='side-panel__box-temperature'>
              <strong className="side-panel__temperature">
                {Math.round(checkValue(valueWeatherData.main, {main: {temp: 1}}).temp)}
              </strong>
              <span className="side-panel__degree">°C</span>
            </div>
            <span className="side-panel__precipitation">{weather}</span>
            <span className="side-panel__feeling">{
              `Ощущается как ${Math.round(checkValue(valueWeatherData.main, {main: {feels_like: 1}}).feels_like)} °C`
            }</span>
          </>}
          {valueLoading &&
            <LoadingAnimation />
          }
        </div>
        <div className="side-panel__box-date">
          <span className="side-panel__day">Сегодня</span>
          <span className="side-panel__date">{getNewDate()}</span>
        </div>
        <div className="side-panel__box-city">
          <svg width="40" height="40" view-box="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9999 3.33334C13.5499 3.33334 8.33325 8.55001 8.33325 15C8.33325 23.75 19.9999 36.6667 19.9999 36.6667C19.9999 36.6667 31.6666 23.75 31.6666 15C31.6666 8.55001 26.4499 3.33334 19.9999 3.33334ZM19.9999 19.1667C18.8949 19.1667 17.835 18.7277 17.0536 17.9463C16.2722 17.1649 15.8333 16.1051 15.8333 15C15.8333 13.8949 16.2722 12.8351 17.0536 12.0537C17.835 11.2723 18.8949 10.8333 19.9999 10.8333C21.105 10.8333 22.1648 11.2723 22.9462 12.0537C23.7276 12.8351 24.1666 13.8949 24.1666 15C24.1666 16.1051 23.7276 17.1649 22.9462 17.9463C22.1648 18.7277 21.105 19.1667 19.9999 19.1667Z" fill="#EC6E4D"/>
          </svg>
          <span className="side-panel__city">{city}</span>
        </div>
      </div>
    </div>
  );
}
