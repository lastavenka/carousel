import React, { Component } from 'react';
import Button from './button';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: '',
      items: [...Array(this.props.size).keys()],
      inTransition: false
    };
  }

  handleClick(e) {
    let direction = e.target.id;
    this.prepareTransition(direction);
  }

  prepareTransition(direction) {
    const items = this.state.items;
    let nextIndex;
    if (direction === 'left') {
      nextIndex = items[0] - 1;
      if (nextIndex < 0) {
        nextIndex = this.props.children.length - 1;
      }
      items.unshift(nextIndex);
    } else {
      nextIndex = items[items.length - 1] + 1;
      if (nextIndex >= this.props.children.length) {
        nextIndex = 0;
      }
      items.push(nextIndex);
    }
    let newOffset = direction === 'left' ? -this.props.itemWidth : 0;
    this.setState(
      {
        items: items,
        offset: newOffset
      },
      () => {
        window.setTimeout(() => this.startTransition(direction), 10); console.log(this.state);
      }
    );
  }

  startTransition(direction) {
    this.setState({ inTransition: true }, () => this.transition(direction));
  }

  transition(direction) {
    const offset = direction === 'left' ? 0 : -this.props.itemWidth;
    this.transitionEndHandler = () => this.finishTransition(direction);
    this.refs.inner.addEventListener(
      'transitionend',
      this.transitionEndHandler
    );

    this.setState({
      offset: offset
    }, () => this.finishTransition(direction));
  }

  finishTransition(direction) {
    this.refs.inner.removeEventListener(
      'transitionend',
      this.transitionEndHandler
    );
    delete this.transitionEndHandler;
    this.setState({ inTransition: false }, () =>
      this.afterTransition(direction)
    );
  }

  afterTransition(direction) {
    const items = this.state.items.slice();

    const newItems =
      direction === 'left' ? items.slice(0, items.length - 1) : items.slice(1);

    this.setState({
      items: newItems,
      offset: 0
    });
  }

  renderSlides() {
    let slides = [];

    for (let i = 0; i < this.state.items.length; i++) {
      slides.push(
        <div
          className="Carousel__slide"
          key={i}
          style={{
            width: this.props.itemWidth
          }}
        >
          {this.props.children[this.state.items[i]]}
        </div>
      );
    }
    return slides;
  }

  render() {
    return (
      <div
        className="Carousel"
        style={{
          width: this.props.itemWidth * this.props.size
        }}
      >
        <div
          className={
            this.state.inTransition
              ? 'Carousel__inner Carousel__inner_in-transition'
              : 'Carousel__inner'
          }
          style={{
            transform: `translateX(${this.state.offset}px)`
          }}
          ref="inner"
        >
          {this.renderSlides()}
        </div>
        <Button direction="left" handleClick={e => this.handleClick(e)} />
        <Button direction="right" handleClick={e => this.handleClick(e)} />
      </div>
    );
  }
}
