'use strict';

const e = React.createElement;

import Home from './home.js'
import Shop from './shop.js'

class Press extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shitemode: "home"
    };
  }

  handleClick(link) {
    this.setState({shitemode: link});
  }

  render() {
    switch (this.state.shitemode) {
      case "shop":
        return <Shop />
        break;
      default: //default to home
        return <Home onclick={() => this.handleClick("shop")}/>
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
