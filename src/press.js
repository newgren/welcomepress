'use strict';

const e = React.createElement;

import Home from './home.js'


class Press extends React.Component {
  constructor(props) {
    super(props);

    /*this.state = { liked: false }; */
  }


  render() {
    const home = e(Home);
    return home;
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
