import { useEffect, useState } from 'react';
import './App.css';
import { Layout } from './Layout';
import { SidePanel } from './Layout/SidePanel';
import { WindowForsecat } from './Layout/WindowForecast';
import { searchCityContext } from './Layout/context/searchCityContext';
import { loadingWeatherContext } from './Layout/context/loadingWeatherContext';
import { weatherDataContext } from './Layout/context/weatherDataContext';
import { getCityApi } from './utils/api/getCityApi';
import { getWeatherFiveApi } from './utils/api/getWeatherFiveApi';
import { changeThemeHTML } from './utils/js/changeThemeHTML';

function App() {
  const localStor = window.localStorage
  const localStorCityListRequests = localStor.cityListRequest ? JSON.parse(localStor.cityListRequest) : []
  const [ cityLastListRequests, setCityLastListRequests ] = useState(localStorCityListRequests)
  const [ loadingWeather, setLoadingWeather ] = useState(true)
  const [ weatherData, setWeatherData ] = useState({})

  changeThemeHTML(localStor.darkTheme ? JSON.parse(localStor.darkTheme) : false)

  async function firstRenderWeather(city) {
    if (city) {
      const [ cityData ] = await getCityApi(city)

      if (cityData) {
        const weatherDataRes = await getWeatherFiveApi({
          lon: cityData.lon,
          lat: cityData.lat
        })

        setWeatherData({
          visibility: weatherDataRes.list[0].visibility,
          wind: weatherDataRes.list[0].wind,
          main: weatherDataRes.list[0].main,
          weather: weatherDataRes.list[0].weather[0],
          list: weatherDataRes.list,
          length: weatherDataRes.cnt
        })

      } else {
        setWeatherData({
          visibility: 'Нет данных',
          wind: 'Нет данных',
          main: 'Нет данных',
          weather: 'Нет данных',
          list: 'Нет данных',
          cnt: 'Нет данных'
        })
      }
    } else {
      const [cityData] = await getCityApi('Москва')
      const weatherDataRes = await getWeatherFiveApi({
        lon: cityData.lon,
        lat: cityData.lat
      })
      setWeatherData({
        visibility: weatherDataRes.list[0].visibility,
        wind: weatherDataRes.list[0].wind,
        main: weatherDataRes.list[0].main,
        weather: weatherDataRes.list[0].weather[0],
        list: weatherDataRes.list,
        length: weatherDataRes.cnt
      })
    }

    setLoadingWeather(false)
  }

  useEffect(() => {
    const bodyWindow = document.querySelector('body')

    bodyWindow.setAttribute('style', `transition: background-color var(--time-transition-5) ease-in-out;`)
    firstRenderWeather(cityLastListRequests.slice(0).reverse()[0])
  }, [])

  return (
    <weatherDataContext.Provider value={{
      valueWeatherData: weatherData,
      onChangeWeatherData: setWeatherData
    }}>
      <searchCityContext.Provider value={{
        value: cityLastListRequests,
        onChange: setCityLastListRequests
      }}>
        <loadingWeatherContext.Provider value={{
          valueLoading: loadingWeather,
          onChangeLoading: setLoadingWeather
        }}>
          <Layout>
            <SidePanel/>
            <WindowForsecat/>
          </Layout>
        </loadingWeatherContext.Provider>
      </searchCityContext.Provider>
    </weatherDataContext.Provider>
  );
}

export default App;
