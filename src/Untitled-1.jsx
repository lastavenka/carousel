onClick(e) {
    direction = 
}


prepareTransition(direction) {
    const tiles = this.state.tiles.concat();
    let nextTile;
    if (direction === 'left') {
        nextTile = ...
        tiles.unshift(nextTile);
    } else {
        nextTile = ...
        tiles.push(nextTile);
    }

    const offset = direction === 'left'
        ? 0
        : -this.itemWidth;

    this.setState({ tiles, offset }, () => this.startTransition(direction));
}

startTransition(direction) {
    // enable transition flag        className=".... Carosuel_in-transition"
    this.setState({ inTransition: true }, () => this.transition(direction))
}

transition(direction) {
    const offset: direction === 'left'
        ? -this.itemWidth
        : 0;

    // adjust final offset (- width / 0)
    this.setState({ offset });

    this.refs.wrapper.addEventListener('transitionEnd', () => finishTransition(direction));
}

finishTransition(direction) {
    // disable transition flag
    this.refs.wrapper.removeEventListener('transitionEnd');

    this.setState({ inTransition: false }, () => afterTransition(direction));
}

afterTransition(direction) {
    const tiles = this.state.tiles;

    const newTiles = direction === 'left'
        ? tiles.slice(1)
        : tiles.slice(0, tiles.length - 2);

    this.setState({
        tiles: newTiles,
        offset: 0
    });
}