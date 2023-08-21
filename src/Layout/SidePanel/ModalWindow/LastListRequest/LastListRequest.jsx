import React from 'react';
import { generateRandomString } from '../../../../utils/js/generateKey';

export function LastListRequest({
  list,
  handleClikBtn
}) {
  // const handleClikBtn = () => {

  // }

  return (
    <ul className='last-list-request'>
      {
        list.map((item) => (
          <li className='last-list-request__item' key={generateRandomString()}>
            <button
              className='last-list-request__btn'
              data-request={item}
              onClick={handleClikBtn}
            >
              <span className='last-list-request__btn-text'>
                {item}
              </span>
              <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.09312 0L0 1.7625L6.79892 7.5L0 13.2375L2.09312 15L11 7.5L2.09312 0Z" fill="#ACACAC"/>
              </svg>
            </button>
          </li>
        ))
      }
    </ul>
  );
}
