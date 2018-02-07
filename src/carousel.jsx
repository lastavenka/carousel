import React, { Component } from 'react';
import Button from './button';

export default class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: '',
      items: [...Array(this.props.size).keys()],
      inTransition: false,
      timeout: false,
      autoPlay: this.props.autoPlay ? true : false
    };
    this.turnAutoplay();
  }

  defineSlideWidth() {
    const slide = document.querySelector('.Carousel__slide');
    return slide.clientWidth;
  }

  renderSlides() {
    let slides = [];

    for (let i = 0; i < this.state.items.length; i++) {
      slides.push(
        <li
          className="Carousel__slide"
          key={i}
          style={{
            width: 100 / this.props.size + '%'
          }}
        >
          {this.props.children[this.state.items[i]]}
        </li>
      );
    }
    return slides;
  }

  turnAutoplay() {
    if (this.state.autoPlay) {
      setInterval(() => {
        this.setState({
          timeout: true,
          autoplay: false
        }),
          this.prepareTransition('right');
      }, this.props.autoPlay);
    }
  }

  handleClick(e) {
    this.setState({
      timeout: true,
      autoPlay: false
    });
    if (this.state.timeout) {
      return;
    } else {
      let direction = e.target.id;
      this.prepareTransition(direction);
    }
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
    let newOffset = direction === 'left' ? -this.defineSlideWidth() : 0;
    this.setState(
      {
        items: items,
        offset: newOffset
      },
      () => {
        window.setTimeout(() => this.startTransition(direction), 10);
      }
    );
  }

  startTransition(direction) {
    this.setState({ inTransition: true }, () => this.transition(direction));
  }

  transition(direction) {
    const offset = direction === 'left' ? 0 : -this.defineSlideWidth();
    this.transitionEndHandler = () => this.finishTransition(direction);
    this.refs.inner.addEventListener(
      'transitionend',
      this.transitionEndHandler
    );

    this.setState({
      offset: offset
    });
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
      offset: 0,
      timeout: false,
      autoPlay: true
    });
  }

  render() {
    console.log(this.state.autoPlay)
    return (
      <div className="Carousel">
        <ul
          className={
            this.state.inTransition
              ? 'Carousel__inner Carousel__inner_in-transition'
              : 'Carousel__inner'
          }
          style={{
            marginLeft: this.state.offset,
            width: 100 / this.props.size * this.state.items.length + '%'
          }}
          ref="inner"
        >
          {this.renderSlides()}
        </ul>
        <Button direction="left" onClick={e => this.handleClick(e)} />
        <Button direction="right" onClick={e => this.handleClick(e)} />
      </div>
    );
  }
}
