import React from 'react';

export function CloseBtn({
  onClick,
  tabIndex
 }) {
  return (
    <button
      className="close-btn"
      tabIndex={tabIndex}
      onClick={onClick}
    >
      <span className="close-btn__line-1"></span>
      <span className="close-btn__line-2"></span>
    </button>
  );
}
