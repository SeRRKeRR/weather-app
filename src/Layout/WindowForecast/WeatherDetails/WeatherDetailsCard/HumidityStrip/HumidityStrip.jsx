import React from 'react';

export function HumidityStrip({
  value
}) {
  return (
    <div className='humiditystrip'>
      <div className='humiditystrip__box-1'>
        <span className='humiditystrip__value'>0</span>
        <span className='humiditystrip__value'>50</span>
        <span className='humiditystrip__value'>100</span>
      </div>
      <div className='humiditystrip__strip-outside'>
        <div
          className='humiditystrip__strip-inside'
          style={{
            width:`${value}%`
          }}
        />
      </div>
      <div className='humiditystrip__box-2'>
        <span className='humiditystrip__value'>%</span>
      </div>
    </div>
  );
}
