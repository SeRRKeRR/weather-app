import React from "react";

export const loadingWeatherContext = React.createContext({
  valueLoading: false,
  onChangeLoading: () => {}
})
