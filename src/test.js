'use strict';

import StrokeText from './strokeText.js'

const e = React.createElement;

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <StrokeText copy='WELCOME' num='0'/>
        <StrokeText copy='PRESS' num='1'/>
        <StrokeText copy='WOW' num='2'/>
      </div>
    )
  }
}

const domContainer = document.querySelector('#test_container');
ReactDOM.render(e(Test), domContainer);
