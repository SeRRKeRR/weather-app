import React from 'react';
import northwestern from '../../../../../assets/img/svg/northwestern.svg';
import { checkWindDirection } from '../../../../../utils/js/checkWindDirection';

export function WindDirection({
  windDirection
}) {
  const windDirectionText = checkWindDirection(windDirection)

  return (
  <div className="wind-direction">
    <div
      className='wind-direction__img-box'
      style={{
        transform: `rotate(-${windDirection}deg)`
      }}
    >
      <img
        className="wind-direction__img"
        src={northwestern}
        alt={`Направление ветра: ${windDirectionText}`}
      />
    </div>
    <span className="wind-direction__text">{windDirectionText}</span>
  </div>
  );
}
