'use strict';

const e = React.createElement;

import Home from './home.js'
import Shop from './shop.js'
import Bag from './bag.js'

class Press extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'shop'
    };
  }

  handleClick(link) {
    this.setState({mode: link});
  }

  render() {
    window.onload = () => alert((window.innerWidth > 0) ? window.innerWidth : screen.width);
    switch (this.state.mode) {
      case 'shop':
        return <Shop goToBag={() => this.handleClick('bag')}/>
        break;
      default: //default to home
        return <Home onclick={() => this.handleClick('shop')}/>
    }
    /*
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Press'
    );
    */
  }
}

const domContainer = document.querySelector('#press_container');
ReactDOM.render(e(Press), domContainer);
