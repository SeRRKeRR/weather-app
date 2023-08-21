import React from 'react';

export function ForecastSwithBtn({
  text,
  active,
  onClick
}) {
  return (
    <button
      className={`forecast-switch-btn ${active ? 'active' : ''}`}
      onClick={onClick}
      >
      {text}
    </button>
  );
}

