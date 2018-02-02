import React from 'react';

const Button = ({ handleClick, direction }) => {
  return (
    <button
      id={direction}
      className={'Carousel__btn Carousel__btn_' + direction}
      onClick={handleClick}
    >
      {direction}
    </button>
  );
};

export default Button;
