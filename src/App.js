import React, { Component } from 'react';
import Carousel from './carousel.jsx';
import './App.css';

class App extends Component {
  render() {
    return (
      <Carousel size={3} autoPlay={4000}>
        <div className="Carousel__item Carousel__item_red" />
        <div className="Carousel__item Carousel__item_green" />
        <div className="Carousel__item Carousel__item_blue" />
        <div className="Carousel__item Carousel__item_yellow" />
        <div className="Carousel__item Carousel__item_black" />
      </Carousel>
    );
  }
}

export default App;
