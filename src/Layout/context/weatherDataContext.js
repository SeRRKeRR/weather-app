import React from "react";

export const weatherDataContext = React.createContext({
  valueWeatherData: [],
  onChangeWeatherData: () => {}
})
