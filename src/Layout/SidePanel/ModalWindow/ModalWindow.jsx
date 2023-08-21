import React, { useContext, useEffect, useState } from 'react';
import { changeTabIndex } from '../../../utils/js/changeTabIndex';
import { changeAriaHidden } from '../../../utils/js/changeAriaHidden';
import { getCityApi } from '../../../utils/api/getCityApi';
import { LastListRequest } from './LastListRequest';
import { searchCityContext } from '../../context/searchCityContext';
import { getWeatherApi } from '../../../utils/api/getWeatherApi';
import { loadingWeatherContext } from '../../context/loadingWeatherContext';
import { weatherDataContext } from '../../context/weatherDataContext';
import { useFocus } from '../../../utils/hooks/useFocus';
import { BtnFirstType } from '../../UI/BtnFirstType';
import { CloseBtn } from '../../UI/CloseBtn';

export function ModalWindow({
  isOpen,
  setClose
}) {
  const { onChangeWeatherData } = useContext(weatherDataContext)
  const { valueLoading, onChangeLoading } = useContext(loadingWeatherContext)
  const { value, onChange } = useContext(searchCityContext)
  const [ inputValue, setInputValue ] = useState('')
  const [ citySearchErr, setCitySearchErr ] = useState(false)
  const [ hint, setHint ] = useState(false)
  const [ refFocusInput, setFocusInput ] = useFocus()

  function closeModalWindow() {
    setInputValue('')
    setCitySearchErr(false)
    setHint(false)
    setClose()
  }

  function saveRequest(list) {
    onChange(list)
    window.localStorage.cityListRequest = JSON.stringify(list)
  }

  async function handleSubmitForm(e) {
    e.preventDefault()

    if (valueLoading || inputValue == '') return

    onChangeLoading(true)
    const [ cityData ] = await getCityApi(inputValue)

    function checkCityName(cityData) {
      const address = cityData.address
      return 'city' in address ? address.city :
        'town' in address ? address.town :
        'boundary' in address ? address.boundary :
        'state' in address ? address.state : cityData.name
    }

    if (cityData) {
      const cityName = checkCityName(cityData)
      const inputValueLow = inputValue.toLowerCase()

      if (cityName.toLowerCase().includes(inputValueLow) || inputValueLow === 'питер' || inputValueLow === 'спб') {
        const weatherData = await getWeatherApi({
          lon: cityData.lon,
          lat: cityData.lat
        })

        onChangeWeatherData({
          visibility: weatherData.visibility,
          wind: weatherData.wind,
          main: weatherData.main,
          weather: weatherData.weather[0],
          coord: weatherData.coord
        })

        closeModalWindow()

        if (value.length >= 5) {
          saveRequest([...value.slice(1), cityName])
        } else {
          saveRequest([...value, cityName])
        }
      } else {
        setCitySearchErr(true)
      }
    } else {
      setCitySearchErr(true)
    }
    onChangeLoading(false)
  }

  function handleChangeInput(e) {
    const regular = /[^ЁёА-я-. ]/g
    if (regular.test(e.target.value)) {
      setHint(true)
    } else {
      setHint(false)
    }

    setInputValue(e.target.value.replace(regular, ''))
  }

  // function handleClikBtn(e) {
  //   const selectCity = value[value.length - e.target.dataset.requestIndex - 1]
  //   const newList = value.slice(0)
  //   newList.splice(value.length - e.target.dataset.requestIndex - 1, 1)
  //   saveRequest([...newList, selectCity])
  //   closeModalWindow()
  // }

  useEffect(() => {
    if (isOpen) setFocusInput()
  }, [isOpen])

  return (
    <div className={`modal-window ${isOpen ? 'open' : ''}`} aria-hidden={changeAriaHidden(isOpen)}>
      <div className="modal-window__container">
        <div className="modal-window__box-close-btn">
          {citySearchErr &&
            <p className='modal-window__notification'>Упс! Город не найден, попробуйте другой</p>
          }
          <CloseBtn
            tabIndex={changeTabIndex(isOpen)}
            onClick={closeModalWindow}
          />
        </div>
        <form
          className="modal-window__form-search-city"
          action='#'
          onSubmit={handleSubmitForm}
        >
          <label className={`modal-window__label-search-city ${hint ? 'active' : ''}`}>
            <svg width="18" height="18" view-box="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.2916 15.8816L11.7316 10.3216C12.8616 8.77163 13.3616 6.74163 12.7116 4.58163C12.0316 2.35163 10.1416 0.601626 7.86163 0.141626C6.80059 -0.0833671 5.70015 -0.0397302 4.66026 0.268573C3.62037 0.576877 2.67398 1.14008 1.90703 1.90703C1.14008 2.67398 0.576877 3.62037 0.268573 4.66026C-0.0397302 5.70015 -0.0833671 6.80059 0.141626 7.86163C0.601626 10.1516 2.35163 12.0416 4.58163 12.7116C6.74163 13.3616 8.77163 12.8616 10.3216 11.7316L15.8816 17.2916C16.0686 17.4786 16.3222 17.5836 16.5866 17.5836C16.8511 17.5836 17.1046 17.4786 17.2916 17.2916C17.4786 17.1046 17.5836 16.8511 17.5836 16.5866C17.5836 16.3222 17.4786 16.0686 17.2916 15.8816ZM2.00163 6.50163C2.00163 4.01163 4.01163 2.00163 6.50163 2.00163C8.99163 2.00163 11.0016 4.01163 11.0016 6.50163C11.0016 8.99163 8.99163 11.0016 6.50163 11.0016C4.01163 11.0016 2.00163 8.99163 2.00163 6.50163Z" fill="#ACACAC"/>
            </svg>
            <input
              className="modal-window__input-search-city"
              placeholder="Москва"
              type='search'
              tabIndex={changeTabIndex(isOpen)}
              value={inputValue}
              onChange={handleChangeInput}
              ref={refFocusInput}
            />
          </label>
          <BtnFirstType
            text='Найти'
            tabIndex={changeTabIndex(isOpen)}
            type='submit'
          />
        </form>
        <LastListRequest
          list={value.slice(0).reverse()}
          handleClikBtn={(e) => setInputValue(e.target.dataset.request)}
        />
      </div>
    </div>
  );
}
