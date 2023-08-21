import { getNewDate } from "../../../utils/js/getNewDate"
import { translateWeatherData } from "../../../utils/js/translateWeatherData"

export function getRendersLists(valueWeatherData) {
  const renderListWeek = []
  const renderListHourly = []
  const plug = {
    date: false,
    degree: {
      day: '',
      night: ''
    },
    dataImg: {
      src: '',
      alt: ''
    }
  }

  let downloaded = false

  function pushItem(renderList, list, index, date, night = '-/-') {
    const { weather, img } = translateWeatherData(list[index].weather[0])

    renderList.push({
      date: date,
      degree: {
        day: Math.round(list[index].main.temp),
        night: night
      },
      dataImg: {
        src: img,
        alt: weather
      }
    })
  }

  if ('list' in valueWeatherData) {
    const list = valueWeatherData.list
    const length = valueWeatherData.length
    const [ day, month, year ] = new Date().toLocaleString("ru", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      timezone: 'UTC'
    }).split('.')

    for( let i = 1; i < 9; ++i ) {
      pushItem(
        renderListHourly,
        list,
        i,
        list[i].dt_txt.split(' ')[1].slice(0, -3),
        ''
      )
    }

    for( let i = 0; i < length; ++i ) {
      if (list[i].dt_txt == `${year}-${month}-${Number(day) + 1} 12:00:00`) {
        for ( let j = i; j < length; j += 8 ) {
          pushItem(
            renderListWeek,
            list,
            j,
            j - i ? getNewDate(list[j].dt * 1000) : 'Завтра'
          )
        }

        if (renderListWeek.length < 5) {
          pushItem(
            renderListWeek,
            list,
            length - 1,
            getNewDate(list[length - 1].dt * 1000)
          )
        }

        let index = 0

        for ( let j = i + 5; j < length; j += 8 ) {
          renderListWeek[index].degree.night = Math.round(list[j].main.temp)
          ++index
        }

        downloaded = true
        break
      }
    }
  }

  return {
    downloaded: downloaded,
    listOnWeek: [ ...renderListWeek, plug, plug ],
    listHourly: renderListHourly
  }
}
