import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    return (
      <button
        className={'Carousel__btn Carousel__btn_' + this.props.direction}
        onClick={this.props.onClick}
        id={this.props.direction}
      >
        {this.props.direction}
      </button>
    );
  }
};

