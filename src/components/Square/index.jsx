import React from 'react';
import './square.scss';
import { setClass } from '../../utils/setSquareClass';

const Square = (props) => {
  let className = 'square';

  if (props.value) {
    if (props.value === 'X') {
      className += ' isX';
    } else {
      className += ' isO';
    }
  }

  className += setClass(props.position);

  return (
    <button
      className={className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
