import React from 'react';

export function ChangeSlideBtn({
  onClick,
  disabled
}) {
  return (
    <button
      className={`change-slide-btn ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <svg width="13" height="16" view-box="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14.5L2.87351 8.85026C2.24198 8.45932 2.24198 7.54068 2.87351 7.14973L12 1.5" strokeWidth="3"/>
      </svg>
    </button>
  );
}
