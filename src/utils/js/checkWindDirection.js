export const windDirections = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];

export  function checkWindDirection(deg, start = 0, index = 0) {
  if (deg > 337.5) return windDirections[0]

  if (deg > (start - 22.5) && deg < (start + 22.5)) {
    return windDirections[index]
  } else {
    return checkWindDirection(deg, (start + 45), ++index)
  }
}
