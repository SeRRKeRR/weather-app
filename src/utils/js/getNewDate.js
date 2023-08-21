export function getNewDate(startDate = '') {
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const date = startDate ? new Date(startDate) : new Date()
  const dateItems = date.toLocaleString("ru", {
    month: 'long',
    day: 'numeric',
    timezone: 'UTC'
  }).split(' ')

  return `${dayNames[date.getDay()]}, ${dateItems[0]} ${dateItems[1].substring(0,3)}`
}
