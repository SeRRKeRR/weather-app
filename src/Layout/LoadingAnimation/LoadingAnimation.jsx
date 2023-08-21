import React from 'react';

export function LoadingAnimation() {
  return (
    <div className='lbs-ellipsis__container'>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
