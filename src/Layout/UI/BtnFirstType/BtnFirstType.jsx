import React from 'react';

export function BtnFirstType({
  text,
  tabIndex,
  onClick = () => {},
  styleName = '',
  type = 'button'
 }) {
  return (
    <button
      className={`btn-first-type ${styleName}`}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}
    >
      {text}
    </button>
  );
}
